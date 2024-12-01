import React, { useState, useEffect } from "react";
import axios from "axios";

const AddItem = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    quantity: "",
    brand: "",
    price: "",
    weight: "",
    shape: "",
    dimensions: { side: "", length: "", breadth: "", height: "", radius: "" },
    productDetails: "",
    unitOfMeasurement: "",
    unitOfWeight: "",
  });

  const [existingItems, setExistingItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [additionalQuantity, setAdditionalQuantity] = useState("");
  const [volume, setVolume] = useState(null);
  const [surfaceArea, setSurfaceArea] = useState(null);

  const unitOptions = ["inch", "centimeter", "feet"];
  const weightOptions = ["mg", "gm", "Kg"];
  const shapeOptions = ["Cube", "Cuboid", "Sphere", "Cylinder"];

  // Fetch Existing Items
  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/getitemdata");
      setExistingItems(response.data.map((item) => item.productName));
    } catch (err) {
      console.error("Error fetching items:", err.message);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Input Change Handler
  const handleInputChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Dimension Change Handler
  const handleDimensionChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      dimensions: { ...prev.dimensions, [key]: value },
    }));
  };

  // Calculate Volume and Surface Area
  useEffect(() => {
    const { shape, dimensions } = formData;
    let calculatedVolume = 0;
    let calculatedSurfaceArea = 0;

    if (shape === "Cube") {
      const side = parseFloat(dimensions.side || 0);
      calculatedVolume = side ** 3;
      calculatedSurfaceArea = 6 * (side ** 2);
    } else if (shape === "Cuboid") {
      const { length, breadth, height } = dimensions;
      calculatedVolume = length * breadth * height;
      calculatedSurfaceArea = 2 * (length * breadth + breadth * height + height * length);
    } else if (shape === "Sphere") {
      const radius = parseFloat(dimensions.radius || 0);
      calculatedVolume = (4 / 3) * Math.PI * radius ** 3;
      calculatedSurfaceArea = 4 * Math.PI * radius ** 2;
    } else if (shape === "Cylinder") {
      const { radius, height } = dimensions;
      calculatedVolume = Math.PI * radius ** 2 * height;
      calculatedSurfaceArea = 2 * Math.PI * radius * (radius + height);
    }

    setVolume(calculatedVolume);
    setSurfaceArea(calculatedSurfaceArea);
  }, [formData]);

  // Add New Item
  const handleNewItemSubmit = async (e) => {
    e.preventDefault();

    if (formData.productDetails && formData.productDetails.split(" ").length > 200) {
      alert("Product details must not exceed 200 words.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/senditemdata", formData);
      alert(response.data.message || "Item added successfully!");
      fetchItems();
      setFormData({
        productName: "",
        category: "",
        quantity: "",
        brand: "",
        price: "",
        weight: "",
        shape: "",
        dimensions: { side: "", length: "", breadth: "", height: "", radius: "" },
        productDetails: "",
        unitOfMeasurement: "",
        unitOfWeight: "",
      });
    } catch (err) {
      console.error("Error adding item:", err.message);
      alert("Failed to add item.");
    }
  };

  // Update Existing Item Quantity
  const handleExistingItemSubmit = async (e) => {
    e.preventDefault();

    if (!selectedItem || !additionalQuantity) {
      alert("Please select an item and specify a quantity.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/senditemdata", {
        productName: selectedItem,
        quantity: additionalQuantity,
      });
      alert(response.data.message || "Quantity updated successfully!");
      fetchItems();
      setSelectedItem("");
      setAdditionalQuantity("");
    } catch (err) {
      console.error("Error updating quantity:", err.message);
      alert("Failed to update item quantity.");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-gray-900 text-gray-200 rounded-lg shadow-lg p-6">
      {/* Tabs */}
      <div className="flex border-b border-gray-700">
        <button
          onClick={() => setActiveTab("tab1")}
          className={`w-1/2 py-3 text-center font-medium sm:text-lg ${activeTab === "tab1" ? "bg-gray-800 text-white border-b-2 border-cyan-500" : "bg-gray-700 text-gray-400"}`}
        >
          Add New Item
        </button>
        <button
          onClick={() => setActiveTab("tab2")}
          className={`w-1/2 py-3 text-center font-medium sm:text-lg ${activeTab === "tab2" ? "bg-gray-800 text-white border-b-2 border-cyan-500" : "bg-gray-700 text-gray-400"}`}
        >
          Add Existing Item
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === "tab1" && (
          <form onSubmit={handleNewItemSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Field label="Item Name" value={formData.productName} onChange={(val) => handleInputChange("productName", val)} placeholder="Enter item name" />
              <Field label="Category" value={formData.category} onChange={(val) => handleInputChange("category", val)} placeholder="Enter category" />
              <Field label="Quantity" type="number" value={formData.quantity} onChange={(val) => handleInputChange("quantity", val)} placeholder="Enter quantity" />
              <Field label="Brand" value={formData.brand} onChange={(val) => handleInputChange("brand", val)} placeholder="Enter brand" />
              <Field label="Price" type="number" value={formData.price} onChange={(val) => handleInputChange("price", val)} placeholder="Enter price" />
              <Field label="Weight" type="number" value={formData.weight} onChange={(val) => handleInputChange("weight", val)} placeholder="Enter weight" />
              <Field label="Unit of Measurement" value={formData.unitOfMeasurement} onChange={(val) => handleInputChange("unitOfMeasurement", val)} options={unitOptions} placeholder="Select unit" />
              <Field label="Shape" value={formData.shape} onChange={(val) => handleInputChange("shape", val)} options={shapeOptions} placeholder="Select shape" />
            </div>
            {formData.shape === "Cube" && (
              <Field label="Side" type="number" value={formData.dimensions.side} onChange={(val) => handleDimensionChange("side", val)} placeholder="Enter side length" />
            )}
            {formData.shape === "Cuboid" && (
              <>
                <Field label="Length" type="number" value={formData.dimensions.length} onChange={(val) => handleDimensionChange("length", val)} placeholder="Enter length" />
                <Field label="Breadth" type="number" value={formData.dimensions.breadth} onChange={(val) => handleDimensionChange("breadth", val)} placeholder="Enter breadth" />
                <Field label="Height" type="number" value={formData.dimensions.height} onChange={(val) => handleDimensionChange("height", val)} placeholder="Enter height" />
              </>
            )}
            {formData.shape === "Sphere" && (
              <Field label="Radius" type="number" value={formData.dimensions.radius} onChange={(val) => handleDimensionChange("radius", val)} placeholder="Enter radius" />
            )}
            {formData.shape === "Cylinder" && (
              <>
                <Field label="Radius" type="number" value={formData.dimensions.radius} onChange={(val) => handleDimensionChange("radius", val)} placeholder="Enter radius" />
                <Field label="Height" type="number" value={formData.dimensions.height} onChange={(val) => handleDimensionChange("height", val)} placeholder="Enter height" />
              </>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Product Details (Optional)</label>
              <textarea
                rows="4"
                maxLength="200"
                value={formData.productDetails}
                onChange={(e) => handleInputChange("productDetails", e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:ring-cyan-600 focus:border-cyan-600"
                placeholder="Add details about the product (200 words max)"
              />
            </div>
            <div className="mt-6">
              <button type="submit" className="w-full sm:w-auto bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-lg px-5 py-2.5">
                Add Item
              </button>
            </div>
          </form>
        )}

        {activeTab === "tab2" && (
          <form onSubmit={handleExistingItemSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Field
                label="Select Item"
                value={selectedItem}
                onChange={(val) => setSelectedItem(val)}
                options={existingItems}
                placeholder="Choose an item"
              />
              <Field
                label="Quantity"
                type="number"
                value={additionalQuantity}
                onChange={(val) => setAdditionalQuantity(val)}
                placeholder="Enter quantity"
              />
            </div>
            <div className="mt-6">
              <button type="submit" className="w-full sm:w-auto bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-lg px-5 py-2.5">
                Add Quantity
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

const Field = ({ label, type = "text", value, onChange, placeholder, options = [] }) => (
  <div>
    <label className="block text-sm font-medium text-gray-200 mb-2">{label}</label>
    {options.length > 0 ? (
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:ring-cyan-600 focus:border-cyan-600"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:ring-cyan-600 focus:border-cyan-600"
        placeholder={placeholder}
      />
    )}
  </div>
);

export default AddItem;
