import Token from "../models/token.model.js";
import ServiceCenter from "../models/serviceCenter.model.js";
import { io } from "../index.js";
import { sendYourTurnEmail } from "../utils/mailer.js";

const getQueueByCounter = async (req, res) => {
  try {
    const counterId = req.user.counterId;
    if (!counterId)
      return res
        .status(400)
        .json({ message: "No counter assigned to this operator" });

    const tokens = await Token.find({
      counterId,
      status: { $in: ["waiting", "called"] },
    })
      .populate("userId", "name phone")
      .sort({ position: 1 });

    res.status(200).json({ tokens });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const callNext = async (req, res) => {
  try {
    const counterId = req.user.counterId;
    if (!counterId)
      return res.status(400).json({ message: "No counter assigned" });

    const current = await Token.findOne({ counterId, status: "called" });
    if (current) {
      current.status = "served";
      await current.save();
      await ServiceCenter.findOneAndUpdate(
        { "counters._id": counterId, totalWaiting: { $gt: 0 } },
        { $inc: { totalWaiting: -1 } },
      );
    }

    const next = await Token.findOne({ counterId, status: "waiting" })
      .sort({ position: 1 })
      .populate("userId", "name email");

    // 🟩 FIXED: Return 200 with success status false so Axios doesn't drop a 404 runtime error
    if (!next)
      return res
        .status(200)
        .json({ success: false, message: "No more tokens in queue" });

    next.status = "called";
    next.operatorId = req.user.userId;
    await next.save();

    if (next.userId?.email) {
      sendYourTurnEmail(
        next.userId.name,
        next.userId.email,
        next.tokenNumber,
        req.user.counterId,
        next.serviceCenterId,
      ).catch((error) => console.log("Your turn email failed:", error.message));
    }

    try {
      if (io && typeof io.to === "function") {
        io.to(next.serviceCenterId.toString()).emit("queue:updated", {
          counterId,
        });
        io.to(next.serviceCenterId.toString()).emit("token:called", {
          tokenId: next._id,
          userId: next.userId,
        });
        if (next.userId?._id) {
          io.to(next.userId._id.toString()).emit("token:called", {
            tokenId: next._id,
            userId: next.userId,
          });
        }
      }
    } catch (socketError) {
      console.log("Operator call socket emit error:", socketError.message);
    }

    return res
      .status(200)
      .json({ success: true, message: "Next token called", token: next });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const skipToken = async (req, res) => {
  try {
    const token = await Token.findById(req.params.id);
    if (!token) return res.status(404).json({ message: "Token not found" });

    token.status = "skipped";
    await token.save();

    await ServiceCenter.findOneAndUpdate(
      { "counters._id": token.counterId, totalWaiting: { $gt: 0 } },
      { $inc: { totalWaiting: -1 } },
    );

    try {
      if (io && typeof io.to === "function") {
        io.to(token.serviceCenterId.toString()).emit("queue:updated", {
          counterId: token.counterId,
        });
      }
    } catch (socketError) {
      console.log("Skip socket emit error:", socketError.message);
    }

    res.status(200).json({ message: "Token skipped" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addWalkIn = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || !name.trim())
      return res.status(400).json({ message: "Customer name is required" });

    const counterId = req.user.counterId;
    const serviceCenterId = req.user.serviceCenterId;
    if (!counterId || !serviceCenterId)
      return res.status(400).json({ message: "No counter assigned" });

    const center = await ServiceCenter.findById(serviceCenterId);
    if (!center)
      return res.status(404).json({ message: "Service center not found" });

    const counter = center.counters.id(counterId);
    if (!counter) return res.status(404).json({ message: "Counter not found" });

    const waitingCount = await Token.countDocuments({
      counterId,
      status: "waiting",
    });

    // userId stays null — this is a walk-in, not a registered user.
    // Their name is stored directly on the token via walkInName.
    const token = await Token.create({
      walkInName: name.trim(),
      serviceCenterId,
      counterId,
      tokenNumber: (counter.currentToken || 0) + 1,
      position: waitingCount + 1,
      estimatedWait: (waitingCount + 1) * 5,
      status: "waiting",
    });

    counter.currentToken = (counter.currentToken || 0) + 1;
    center.totalWaiting += 1;
    await center.save();

    try {
      if (io && typeof io.to === "function") {
        io.to(serviceCenterId.toString()).emit("queue:updated", { counterId });
      }
    } catch (socketError) {
      console.log("Walk in socket emit error:", socketError.message);
    }

    res.status(201).json({ message: "Walk-in added successfully", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getQueueByCounter, callNext, skipToken, addWalkIn };
