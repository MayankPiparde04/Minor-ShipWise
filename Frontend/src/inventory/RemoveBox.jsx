import React, { useState, useEffect } from "react";
import axios from "axios";

const RemoveBox = () => {
  const [boxes, setBoxes] = useState([]); // List of boxes fetched from API
  const [selectedBox, setSelectedBox] = useState(""); // Selected box for removal
  const [quantity, setQuantity] = useState(""); // Quantity to remove
  const [message, setMessage] = useState(""); // Message to show user
  const [error, setError] = useState(""); // Error message for quantity validation
  const [loading, setLoading] = useState(true); // Loading state
  const [fetchError, setFetchError] = useState(null); // Error during data fetch

  // Fetch boxes from API
  useEffect(() => {
    const fetchBoxes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/getboxes");
        setBoxes(response.data);
        setLoading(false);
      } catch (err) {
        setFetchError("Failed to fetch boxes.");
        setLoading(false);
      }
    };

    fetchBoxes();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedBox || !quantity) {
      alert("Please select a box and specify the quantity.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/removebox", {
        boxName: selectedBox,
        quantity: parseInt(quantity, 10),
      });

      // If box is removed successfully, show the message
      setMessage(response.data.message || "Box removed successfully!");

      // Re-fetch boxes to update the list
      const updatedBoxes = await axios.get("http://localhost:5000/api/getboxes");
      setBoxes(updatedBoxes.data);

      // Clear the form after success
      setSelectedBox("");
      setQuantity("");
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to remove box.");
    }
  };

  // Handle quantity input and check for limit exceed
  const handleQuantityChange = (e) => {
    const inputQuantity = parseInt(e.target.value, 10);
    setQuantity(inputQuantity);

    const selectedBoxData = boxes.find((box) => box.boxName === selectedBox);
    if (selectedBoxData && inputQuantity > selectedBoxData.quantity) {
      setError(
        `Cannot remove ${inputQuantity}. Available quantity is ${selectedBoxData.quantity}.`
      );
    } else {
      setError("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-4 sm:p-8">
      <h2 className="text-3xl font-bold text-center text-cyan-400 mb-8">
        Remove a Box
      </h2>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
        {loading && <p className="text-center text-gray-400">Loading boxes...</p>}
        {fetchError && <p className="text-center text-red-500">{fetchError}</p>}

        {!loading && !fetchError && (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Select Box */}
              <div>
                <label
                  htmlFor="box"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Select Box
                </label>
                <select
                  id="box"
                  value={selectedBox}
                  onChange={(e) => setSelectedBox(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 text-gray-200 rounded-lg p-2.5 focus:ring-cyan-600 focus:border-cyan-600"
                  required
                >
                  <option value="">Select a box</option>
                  {boxes.map((box) => (
                    <option key={box._id} value={box.boxName}>
                      {box.boxName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity Input */}
              <div>
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-full bg-gray-700 border border-gray-600 text-gray-200 rounded-lg p-2.5 focus:ring-cyan-600 focus:border-cyan-600"
                  placeholder="Enter quantity"
                  required
                />
                {error && <p className="text-sm text-red-400 mt-2">{error}</p>}
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="px-6 py-2.5 text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg font-medium text-sm focus:ring-4 focus:ring-cyan-500"
                disabled={!!error}
              >
                Remove Box
              </button>
            </div>
          </form>
        )}

        {/* Display the success message */}
        {message && <p className="text-center text-cyan-400 mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default RemoveBox;
