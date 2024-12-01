import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShippingCalculator = () => {
  const [inventory, setInventory] = useState({}); // Stores product data from the API
  const [boxes, setBoxes] = useState([]); // Stores box data from the API
  const [selectedProduct, setSelectedProduct] = useState(''); // Selected product for calculation
  const [selectedBox, setSelectedBox] = useState(''); // Selected box for calculation
  const [quantity, setQuantity] = useState(1); // Quantity of products
  const [unit, setUnit] = useState('cm'); // Unit for dimensions
  const [weightUnit, setWeightUnit] = useState('kg'); // Unit for weight
  const [result, setResult] = useState(null); // Stores the result of shipping calculation
  const [error, setError] = useState(''); // Error message if any

  // Fetch product data from the API when the component mounts
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/getitemdata');
        const inventoryData = response.data.reduce((acc, item) => {
          acc[item.productName] = item; // Store each item by its productName
          return acc;
        }, {});
        setInventory(inventoryData);
      } catch (error) {
        console.error('Error fetching inventory data:', error);
      }
    };

    const fetchBoxes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/getboxes');
        setBoxes(response.data);
      } catch (error) {
        console.error('Error fetching box data:', error);
      }
    };

    fetchInventory();
    fetchBoxes();
  }, []); // Empty dependency array to run the effect only once when the component mounts

  // Handle product selection
  const handleProductChange = (event) => {
    setSelectedProduct(event.target.value);
  };

  // Handle box selection
  const handleBoxChange = (event) => {
    setSelectedBox(event.target.value);
  };

  // Handle quantity change
  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value) || 1);
  };

  // Handle calculate button click
  const handleCalculate = async () => {
    if (!selectedProduct || !selectedBox) {
      setResult(null);
      setError('Please select both a product and a box.');
      return;
    }

    const product = inventory[selectedProduct]; // Get the selected product from the inventory state
    const box = boxes.find((box) => box.boxName === selectedBox); // Get the selected box dimensions

    if (!product || !box) {
      setError('Selected product or box is not valid.');
      setResult(null);
      return;
    }

    const productData = {
      shape: product.shape,
      dimensions: product.dimensions,
      unit, // Unit for dimensions (cm/inches)
      weight: product.weight,
      weightUnit, // Unit for weight (kg/pounds)
      quantity,
      boxDimensions: box.dimensions, // Box dimensions
      boxUnit: box.unit // Box unit (cm/inches)
    };

    try {
      // Send the product data and box dimensions to the backend to calculate the shipping
      const response = await axios.post('http://localhost:5000/api/calculate-shipping', productData);
      setResult(response.data); // Set the result received from the backend
      setError('');
    } catch (error) {
      console.error('Error calculating shipping:', error);
      setResult(null);
      setError('Error calculating shipping. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-900 text-white shadow-md rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">Shipping Calculator</h1>

      {/* Product selection */}
      <div className="mb-4">
        <label htmlFor="product" className="block text-lg font-semibold">Select a Product:</label>
        <select
          id="product"
          value={selectedProduct}
          onChange={handleProductChange}
          className="w-full p-2 mt-2 border border-gray-700 bg-gray-800 text-white rounded-md"
        >
          <option value="">--Select Product--</option>
          {Object.keys(inventory).map((productName) => (
            <option key={productName} value={productName}>
              {productName}
            </option>
          ))}
        </select>
      </div>

      {/* Box selection */}
      <div className="mb-4">
        <label htmlFor="box" className="block text-lg font-semibold">Select a Box:</label>
        <select
          id="box"
          value={selectedBox}
          onChange={handleBoxChange}
          className="w-full p-2 mt-2 border border-gray-700 bg-gray-800 text-white rounded-md"
        >
          <option value="">--Select Box--</option>
          {boxes.map((box) => (
            <option key={box.boxName} value={box.boxName}>
              {box.boxName} (Dimensions: {box.dimensions.length} x {box.dimensions.breadth} x {box.dimensions.height} {box.unit})
            </option>
          ))}
        </select>
      </div>

      {/* Quantity input */}
      <div className="mb-4">
        <label htmlFor="quantity" className="block text-lg font-semibold">Quantity:</label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={handleQuantityChange}
          min="1"
          className="w-full p-2 mt-2 border border-gray-700 bg-gray-800 text-white rounded-md"
        />
      </div>

      {/* Unit selection for dimensions */}
      <div className="mb-4">
        <label htmlFor="unit" className="block text-lg font-semibold">Unit (for dimensions):</label>
        <select
          id="unit"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="w-full p-2 mt-2 border border-gray-700 bg-gray-800 text-white rounded-md"
        >
          <option value="cm">Centimeters (cm)</option>
          <option value="inches">Inches</option>
        </select>
      </div>

      {/* Unit selection for weight */}
      <div className="mb-6">
        <label htmlFor="weightUnit" className="block text-lg font-semibold">Weight Unit:</label>
        <select
          id="weightUnit"
          value={weightUnit}
          onChange={(e) => setWeightUnit(e.target.value)}
          className="w-full p-2 mt-2 border border-gray-700 bg-gray-800 text-white rounded-md"
        >
          <option value="kg">Kilograms (kg)</option>
          <option value="pounds">Pounds (lbs)</option>
        </select>
      </div>

      {/* Calculate button */}
      <div className="flex justify-center mb-4">
        <button
          onClick={handleCalculate}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
        >
          Calculate Shipping
        </button>
      </div>

      {/* Display result or error */}
      {error && (
        <div className="bg-red-600 p-4 text-red-200 rounded-md mb-4">
          {error}
        </div>
      )}

      {result && (
        <div className="bg-gray-800 p-4 rounded-md">
          <h2 className="text-2xl font-semibold">Optimal Packing Result</h2>
          <p className="mt-2">Carton Size: {result.cartonSize.length} x {result.cartonSize.breadth} x {result.cartonSize.height}</p>
          <p>Weight per Carton: {result.weight.perCarton} kg</p>
          <p>Total Cartons Required: {result.cartonsRequired}</p>
          <p>Distribution: {result.distribution[0].quantity} cartons available</p>
        </div>
      )}
    </div>
  );
};

export default ShippingCalculator;
