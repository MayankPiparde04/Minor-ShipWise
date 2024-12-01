import React, { useState, useEffect } from "react";
import axios from "axios";

const AddBox = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [formData, setFormData] = useState({
    boxName: "",
    dimensions: { length: "", breadth: "", height: "" },
    quantity: "",
    unit: "",
  });
  const [existingBoxes, setExistingBoxes] = useState([]);
  const [selectedBox, setSelectedBox] = useState("");
  const [additionalQuantity, setAdditionalQuantity] = useState("");

  const unitOptions = ["inch", "centimeter", "feet"];

  // Fetch Existing Boxes
  const fetchBoxes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/getboxes");
      setExistingBoxes(response.data.map((box) => box.boxName));
    } catch (err) {
      console.error("Error fetching boxes:", err.message);
    }
  };

  useEffect(() => {
    fetchBoxes();
  }, []);

  // Handle Form Input Changes
  const handleInputChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleDimensionChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      dimensions: { ...prev.dimensions, [key]: value },
    }));
  };

  // Submit New Box
  const handleNewBoxSubmit = async (e) => {
    e.preventDefault();
    const { boxName, dimensions, quantity, unit } = formData;

    if (!boxName || !quantity || !unit || !dimensions.length || !dimensions.breadth || !dimensions.height) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/addbox", formData);
      alert("Box added successfully!");
      fetchBoxes();
      setFormData({
        boxName: "",
        dimensions: { length: "", breadth: "", height: "" },
        quantity: "",
        unit: "",
      });
    } catch (err) {
      console.error("Error adding box:", err.message);
      alert("Failed to add box.");
    }
  };

  // Update Quantity of Existing Box
  const handleExistingBoxSubmit = async (e) => {
    e.preventDefault();

    if (!selectedBox || !additionalQuantity) {
      alert("Please select a box and specify the quantity.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/updateboxquantity", {
        boxName: selectedBox,
        additionalQuantity,
      });
      alert("Box quantity updated successfully!");
      fetchBoxes();
      setSelectedBox("");
      setAdditionalQuantity("");
    } catch (err) {
      console.error("Error updating quantity:", err.message);
      alert("Failed to update box quantity.");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-gray-900 text-gray-200 rounded-lg shadow-lg p-6">
      {/* Tabs Navigation */}
      <div className="flex border-b border-gray-700">
        <button
          onClick={() => setActiveTab("tab1")}
          className={`w-1/2 py-3 text-center font-medium sm:text-lg ${activeTab === "tab1" ? "bg-gray-800 text-white border-b-2 border-cyan-500" : "bg-gray-700 text-gray-400"}`}
        >
          Add New Box
        </button>
        <button
          onClick={() => setActiveTab("tab2")}
          className={`w-1/2 py-3 text-center font-medium sm:text-lg ${activeTab === "tab2" ? "bg-gray-800 text-white border-b-2 border-cyan-500" : "bg-gray-700 text-gray-400"}`}
        >
          Add Existing Box
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === "tab1" && (
          <form onSubmit={handleNewBoxSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Field label="Box Name" value={formData.boxName} onChange={(val) => handleInputChange("boxName", val)} placeholder="Enter box name" />
              {["length", "breadth", "height"].map((dim) => (
                <Field
                  key={dim}
                  label={dim.charAt(0).toUpperCase() + dim.slice(1)}
                  type="number"
                  value={formData.dimensions[dim]}
                  onChange={(val) => handleDimensionChange(dim, val)}
                  placeholder={`Enter ${dim}`}
                />
              ))}
              <Field label="Quantity" type="number" value={formData.quantity} onChange={(val) => handleInputChange("quantity", val)} placeholder="Enter quantity" />
              <Field label="Unit of Measurement" value={formData.unit} onChange={(val) => handleInputChange("unit", val)} options={unitOptions} placeholder="Select a unit" />
            </div>
            <button type="submit" className="mt-4 w-full sm:w-auto bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-lg px-5 py-2.5">
              Add Box
            </button>
          </form>
        )}

        {activeTab === "tab2" && (
          <form onSubmit={handleExistingBoxSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Field
                label="Select Box"
                value={selectedBox}
                onChange={(val) => setSelectedBox(val)}
                options={existingBoxes}
                placeholder="Choose a box"
              />
              <Field
                label="Additional Quantity"
                type="number"
                value={additionalQuantity}
                onChange={(val) => setAdditionalQuantity(val)}
                placeholder="Enter quantity"
              />
            </div>
            <button type="submit" className="mt-4 w-full sm:w-auto bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-lg px-5 py-2.5">
              Update Quantity
            </button>
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
        className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-gray-200 focus:ring-cyan-500 focus:border-cyan-500"
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
        placeholder={placeholder}
        className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-gray-200 focus:ring-cyan-500 focus:border-cyan-500"
      />
    )}
  </div>
);

export default AddBox;
