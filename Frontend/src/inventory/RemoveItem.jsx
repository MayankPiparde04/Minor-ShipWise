import React, { useState, useEffect } from "react";
import axios from "axios";

const RemoveItem = () => {
  const [items, setItems] = useState([]); // List of items fetched from API
  const [selectedItem, setSelectedItem] = useState(""); // Selected item for removal
  const [quantity, setQuantity] = useState(""); // Quantity to remove
  const [message, setMessage] = useState(""); // Success message
  const [error, setError] = useState(""); // Error state for exceeding quantity
  const [loading, setLoading] = useState(true); // Loading state
  const [fetchError, setFetchError] = useState(null); // Error during data fetch

  // Fetch items from API
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/getitemdata"); // Replace with your API endpoint
        setItems(response.data);
        setLoading(false);
      } catch (err) {
        setFetchError("Failed to fetch items.");
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedItem || !quantity) {
      alert("Please select an item and specify the quantity.");
      return;
    }

    try {
      const selectedItemData = items.find((item) => item.productName === selectedItem);

      // Check if quantity to remove exceeds the available quantity
      if (parseInt(quantity, 10) > selectedItemData.quantity) {
        setError(
          `Cannot remove ${quantity}. Available quantity is ${selectedItemData.quantity}.`
        );
        return;
      } else {
        setError(""); // Clear the error if the quantity is valid
      }

      const response = await axios.post("http://localhost:5000/api/removeitem", {
        productName: selectedItem,
        quantity: parseInt(quantity, 10),
      });

      // If item is removed successfully, show the message
      setMessage(response.data.message || "Item removed successfully!");

      // Re-fetch items to update the list
      const updatedItems = await axios.get("http://localhost:5000/api/getitemdata");
      setItems(updatedItems.data);

      // Clear the form after success
      setSelectedItem("");
      setQuantity("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to remove item.");
    }
  };

  // Handle quantity input and reset error if needed
  const handleQuantityChange = (e) => {
    const inputQuantity = parseInt(e.target.value, 10);
    setQuantity(inputQuantity);

    const selectedItemData = items.find((item) => item.productName === selectedItem);
    if (selectedItemData && inputQuantity > selectedItemData.quantity) {
      setError(
        `Cannot remove ${inputQuantity}. Available quantity is ${selectedItemData.quantity}.`
      );
    } else {
      setError("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-4 sm:p-8">
      <h2 className="text-3xl font-bold text-center text-cyan-400 mb-8">Remove an Item</h2>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
        {loading && <p className="text-center text-gray-400">Loading items...</p>}
        {fetchError && <p className="text-center text-red-500">{fetchError}</p>}

        {!loading && !fetchError && (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Select Item */}
              <div>
                <label htmlFor="item" className="block text-sm font-medium text-gray-300 mb-2">
                  Select Item
                </label>
                <select
                  id="item"
                  value={selectedItem}
                  onChange={(e) => setSelectedItem(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 text-gray-200 rounded-lg p-2.5 focus:ring-cyan-600 focus:border-cyan-600"
                  required
                >
                  <option value="">Select an item</option>
                  {items.map((item) => (
                    <option key={item._id} value={item.productName}>
                      {item.productName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity Input */}
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-300 mb-2">
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
                {/* Show error message below quantity input */}
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="px-6 py-2.5 text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg font-medium text-sm focus:ring-4 focus:ring-cyan-500"
                disabled={!!error}
              >
                Remove Item
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

export default RemoveItem;
