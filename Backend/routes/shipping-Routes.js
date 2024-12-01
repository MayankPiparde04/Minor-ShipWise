const express = require("express");
const router = express.Router();

// Import helpers and constants
const {
  CONSTANTS,
  INVENTORY,
  ProductDimensions,
  convertToInches,
  convertToKg,
  calculateDimensions,
  calculateOptimalPacking,
} = require("../utils/shippingUtils");

// Shipping Calculation Endpoint
router.post("/calculate-shipping", async (req, res) => {
  try {
    const { shape, dimensions, unit, weight, weightUnit, quantity } = req.body;

    // Validate input
    if (!shape || !dimensions || !unit || !weight || !weightUnit || !quantity) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Calculate product dimensions based on shape
    const productDims = calculateDimensions(shape, dimensions, unit);
    if (!productDims) {
      return res.status(400).json({ error: "Invalid shape or dimensions." });
    }

    // Convert weight to kilograms
    const weightInKg = convertToKg(weight, weightUnit);

    // Perform optimal packing calculation
    const packingResult = calculateOptimalPacking(productDims, weightInKg, quantity);

    if (!packingResult.success) {
      return res.status(400).json({ error: "Packing calculation failed." });
    }

    // Return the result
    return res.status(200).json(packingResult);
  } catch (error) {
    console.error("Error calculating shipping:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
