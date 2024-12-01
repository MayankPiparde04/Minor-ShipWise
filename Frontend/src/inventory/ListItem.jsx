import React, { useState, useEffect } from 'react';
import axios from 'axios';


const ListItem = () => {
  // States for data, search term, and loading/error handling
  const [items, setItems] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch items from the API
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/getitemdata'); // Update API URL if needed
        setItems(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch items');
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // Filter items based on the search text
  const filteredItems = items.filter(item =>
    item.productName.toLowerCase().includes(searchText.toLowerCase()) ||
    item.shape?.toLowerCase().includes(searchText.toLowerCase()) ||
    item.weight?.toString().includes(searchText) ||
    item.quantity?.toString().includes(searchText) ||
    item.price?.toString().includes(searchText)
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-4 sm:p-8 flex-col gap-4 justify-center">
      <h1 className="text-3xl font-bold text-center text-cyan-400 mb-8">Items Inventory</h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search items..."
          className="w-full max-w-md p-3 rounded-md bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {/* Loading and Error States */}
      {loading && <p className="text-center text-gray-400">Loading items...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Items Table */}
      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse bg-gray-800 rounded-md overflow-hidden">
            <thead>
              <tr className="bg-gray-700 text-gray-300">
                <th className="px-4 py-3">Item Name</th>
                <th className="px-4 py-3">Shape</th>
                <th className="px-4 py-3">Weight</th>
                <th className="px-4 py-3">Quantity</th>
                <th className="px-4 py-3">Price</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item, index) => (
                <tr
                  key={item._id || index}
                  className={`${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'
                    } hover:bg-gray-600 transition-colors duration-200`}
                >
                  <td className="px-4 py-3">{item.productName}</td>
                  <td className="px-4 py-3">{item.shape || 'N/A'}</td>
                  <td className="px-4 py-3">{item.weight || 'N/A'}</td>
                  <td className="px-4 py-3">{item.quantity}</td>
                  <td className="px-4 py-3">{item.price || 'N/A'}</td>
                </tr>
              ))}
              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-4 py-3 text-center text-gray-400">
                    No items found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ListItem;
