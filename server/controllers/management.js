import mongoose from "mongoose";
import User from "../models/User.js";
import Transaction from "../models/Transactions.js";
export const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }).select("-password");
    res.status(200).json(admins);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserPerformance = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the provided ID is in the correct format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const userWithStats = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "affiliatestats",
          localField: "_id",
          foreignField: "userId",
          as: "affiliatestats",
        },
      },
      { $unwind: "$affiliatestats" },
    ]);

    // Check if userWithStats is undefined or empty
    if (!userWithStats || userWithStats.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Access affiliateSales property if it exists
    const salesTransactions = userWithStats[0].affiliateStats?.affiliateSales
      ? await Promise.all(
          userWithStats[0].affiliateStats.affiliateSales.map((id) => {
            return Transaction.findById(id);
          })
        )
      : [];

    res.status(200).json({ user: userWithStats[0], sales: salesTransactions });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
