import mongoose from "mongoose";
import ServiceCenter from "../models/serviceCenter.model.js";
import Token from "../models/token.model.js";
import User from "../models/user.model.js";

const getAdminOverview = async (req, res) => {
  try {
    const serviceCenterId = req.user.serviceCenterId

    const center = await ServiceCenter.findById(serviceCenterId)
    if (!center) return res.status(404).json({ message: 'Service center not found' })

    const totalWaiting = await Token.countDocuments({ serviceCenterId, status: 'waiting' })
    const totalServed = await Token.countDocuments({ serviceCenterId, status: 'served' })

    res.status(200).json({
      center,
      summary: {
        totalWaiting,
        totalServed,
        totalCounters: center.counters.length
      }
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const toggleCounter = async (req, res) => {
  try {
    const { centerId, counterId } = req.params;
    const { status } = req.body;

    const center = await ServiceCenter.findById(centerId);
    if (!center)
      return res.status(404).json({ message: "Service center not found" });

    if (center._id.toString() !== req.user.serviceCenterId.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    const counter = center.counters.id(counterId);
    if (!counter) return res.status(404).json({ message: "Counter not found" });

    counter.status = status;
    await center.save();

    res
      .status(200)
      .json({ message: `Counter ${status} successfully`, counter });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOperatorScorecard = async (req, res) => {
  try {
    const serviceCenterId = req.user.serviceCenterId;

    const scorecard = await Token.aggregate([
      {
        $match: {
          serviceCenterId: new mongoose.Types.ObjectId(serviceCenterId),
          operatorId: { $exists: true, $ne: null },
          status: { $in: ["served", "skipped"] },
        },
      },
      {
        $group: {
          _id: "$operatorId",
          totalServed: {
            $sum: { $cond: [{ $eq: ["$status", "served"] }, 1, 0] },
          },
          totalSkipped: {
            $sum: { $cond: [{ $eq: ["$status", "skipped"] }, 1, 0] },
          },
          avgServiceTime: {
            $avg: {
              $cond: [
                { $eq: ["$status", "served"] },
                { $divide: [{ $subtract: ["$updatedAt", "$createdAt"] }, 60000] },
                null,
              ],
            },
          },
        },
      },
    ]);

    // Calculate center average service time
    const centerAvg =
      scorecard.reduce((sum, op) => sum + (op.avgServiceTime || 0), 0) /
      (scorecard.length || 1);

    // Populate operator names and calculate performance
    const result = await Promise.all(
      scorecard.map(async (op) => {
        const operator = await User.findById(op._id).select("name email");
        const total = op.totalServed + op.totalSkipped;
        const skipRate = total > 0 ? Math.round((op.totalSkipped / total) * 100) : 0;
        const avgTime = Math.round((op.avgServiceTime || 0) * 10) / 10;
        const timePenalty = avgTime > centerAvg ? Math.round(((avgTime - centerAvg) / centerAvg) * 30) : 0;
        const performance = Math.max(0, Math.min(100, 100 - skipRate - timePenalty));

        return {
          operatorId: op._id,
          name: operator?.name || "Unknown",
          email: operator?.email || "",
          totalServed: op.totalServed,
          totalSkipped: op.totalSkipped,
          avgServiceTime: avgTime,
          skipRate,
          performance,
        };
      })
    );

    // Fetch all operators of this service center
    const allOperators = await User.find({
      serviceCenterId,
      role: 'operator'
    }).select('name email');

    const scorecardMap = new Map(result.map(op => [op.operatorId.toString(), op]));

    const finalResult = allOperators.map(op => {
      if (scorecardMap.has(op._id.toString())) {
        return scorecardMap.get(op._id.toString());
      }
      return {
        operatorId: op._id,
        name: op.name,
        email: op.email,
        totalServed: 0,
        totalSkipped: 0,
        avgServiceTime: 0,
        skipRate: 0,
        performance: 100,
      };
    });

    res.status(200).json({ scorecard: finalResult });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAdminOverview, toggleCounter, getOperatorScorecard };