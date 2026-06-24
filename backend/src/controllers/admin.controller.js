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

export { getAdminOverview, toggleCounter };
