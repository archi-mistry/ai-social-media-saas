const mongoose = require("mongoose");

const historySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    prompt: String,
    platform: String,
    style: String,
    output: {
      hook: String,
      value: String,
      cta: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("History", historySchema);
