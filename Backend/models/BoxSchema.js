const mongoose = require("mongoose");

const boxSchema = new mongoose.Schema({
  boxName: { type: String, required: true, unique: true },
  dimensions: {
    length: { type: Number, required: true },
    breadth: { type: Number, required: true },
    height: { type: Number, required: true },
  },
  quantity: { type: Number, required: true, default: 0 },
  unit: { type: String, required: true },
});

// Ensure that the box name is unique and prevent adding boxes with the same name
boxSchema.index({ boxName: 1 }, { unique: true });

module.exports = mongoose.model("BoxData", boxSchema);
