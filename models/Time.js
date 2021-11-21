import mongoose from "mongoose";

const TimeSchema = new mongoose.Schema(
  {
    name: String,
    timestamp: Date,
    action: String,
  },
  {
    collection: "logs",
  }
);

module.exports = mongoose.models.Time || mongoose.model("Time", TimeSchema);
