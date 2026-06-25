import { io } from "../index.js";
import ServiceCenter from "../models/serviceCenter.model.js";
import Token from "../models/token.model.js";
import { sendTokenConfirmationEmail } from "../utils/mailer.js";
import User from "../models/user.model.js";

const getAllServiceCenters = async (req, res) => {
  try {
    const centers = await ServiceCenter.find();
    res.status(200).json({ centers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getServiceCenterById = async (req, res) => {
  try {
    const center = await ServiceCenter.findById(req.params.id);
    if (!center)
      return res.status(404).json({ message: "Service center not found" });
    res.status(200).json({ center });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const joinQueue = async (req, res) => {
  try {
    const { serviceCenterId, counterId } = req.body;
    const userId = req.user.userId;

    const existingToken = await Token.findOne({
      userId,
      serviceCenterId,
      status: "waiting",
    });
    if (existingToken)
      return res.status(400).json({ message: "You are already in this queue" });

    const center = await ServiceCenter.findById(serviceCenterId);
    if (!center)
      return res.status(404).json({ message: "Service center not found" });

    const counter = center.counters.id(counterId);
    if (!counter) return res.status(404).json({ message: "Counter not found" });

    const waitingCount = await Token.countDocuments({
      serviceCenterId,
      counterId,
      status: "waiting",
    });

    const token = await Token.create({
      userId,
      serviceCenterId,
      counterId,
      tokenNumber: counter.currentToken + 1,
      position: waitingCount + 1,
      estimatedWait: (waitingCount + 1) * 5,
    });
    const user = await User.findById(userId).select("name email");
    try {
      await sendTokenConfirmationEmail(
        user.name,
        user.email,
        token.tokenNumber,
        center.name,
        token.estimatedWait,
      );
    } catch (error) {
      console.log("Token confirmation email failed:", error.message);
    }

    counter.currentToken += 1;
    center.totalWaiting += 1;
    await center.save();
    io.to(serviceCenterId.toString()).emit("queue:updated", { counterId });
    res.status(201).json({ message: "Joined queue successfully", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyToken = async (req, res) => {
  try {
    const token = await Token.findOne({
      userId: req.user.userId,
      status: { $in: ["waiting", "called"] },
    }).populate("serviceCenterId", "name location");

    if (!token)
      return res.status(404).json({ message: "No active token found" });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const cancelToken = async (req, res) => {
  try {
    const token = await Token.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });
    if (!token) return res.status(404).json({ message: "Token not found" });

    token.status = "cancelled";
    await token.save();

    await ServiceCenter.findByIdAndUpdate(token.serviceCenterId, {
      $inc: { totalWaiting: -1 },
    });
    io.to(token.serviceCenterId.toString()).emit("queue:updated", {
      counterId: token.counterId,
    });
    res.status(200).json({ message: "Token cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllServiceCenters,
  getServiceCenterById,
  joinQueue,
  getMyToken,
  cancelToken,
};
