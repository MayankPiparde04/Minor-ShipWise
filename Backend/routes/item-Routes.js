const express = require("express");
const router = express.Router();
const ItemData = require("../models/ItemSchema.js");

// Add or Update Item
router.post("/senditemdata", async (req, res) => {
  try {
    const { productName, quantity = 0, ...otherFields } = req.body;

    // Check if the item exists
    let item = await ItemData.findOne({ productName });

    if (item) {
      // Update quantity and any other non-null fields
      item.quantity = (item.quantity || 0) + parseInt(quantity, 10);
      Object.keys(otherFields).forEach((key) => {
        if (otherFields[key] !== null && otherFields[key] !== undefined) {
          item[key] = otherFields[key];
        }
      });
      await item.save();
      return res.status(200).json({ message: "Item updated successfully!", data: item });
    } else {
      // Create a new item
      const newItem = new ItemData({ productName, quantity, ...otherFields });
      await newItem.save();
      return res.status(201).json({ message: "Item added successfully!", data: newItem });
    }
  } catch (error) {
    console.error("Error in senditemdata:", error.message);
    return res.status(500).json({ error: "Failed to save or update item" });
  }
});

// Fetch All Items
router.get("/getitemdata", async (req, res) => {
  try {
    const data = await ItemData.find();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching items:", error.message);
    return res.status(500).json({ error: "Failed to fetch items" });
  }
});

module.exports = router;
