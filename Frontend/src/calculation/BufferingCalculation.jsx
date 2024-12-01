import React, { useState } from "react";
// import bufferImage from '../assets/Cartons/buffer-page.png';

const BufferingCalculation = () => {
  const [category, setCategory] = useState("");
  const [unit, setUnit] = useState("");
  const [size, setSize] = useState("");
  const [weight, setWeight] = useState("");
  const [bufferSize, setBufferSize] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateBufferSize();
  };

  const calculateBufferSize = () => {
    let weightInGrams = weight;

    if (unit === "Kilogram") {
      weightInGrams = weight * 1000;
    }

    let buffer = "";

    if (category === "Glass") {
      if (size === "Small" && weightInGrams <= 10) {
        buffer = "0.1 cm";
      } else if (size === "Medium") {
        buffer = weightInGrams <= 2000 ? "3 cm" : "5 cm";
      } else if (size === "Large") {
        if (weightInGrams <= 2000) {
          buffer = "6 cm";
        } else if (weightInGrams <= 5000) {
          buffer = "8 cm";
        } else {
          buffer = "10 cm";
        }
      }
    } else if (category === "Durable Plastic") {
      if (size === "Small") {
        buffer = weightInGrams <= 10 ? "0.1 cm" : weightInGrams <= 100 ? "0.5 cm" : "N/A";
      } else if (size === "Medium") {
        buffer = weightInGrams <= 200 ? "0.6 cm" : "1 cm";
      }
    } else if (category === "Non-Durable Plastic") {
      if (size === "Small") {
        buffer = weightInGrams <= 10 ? "0.3 cm" : weightInGrams <= 100 ? "0.8 cm" : "N/A";
      } else if (size === "Medium") {
        buffer = weightInGrams <= 200 ? "1 cm" : "1.3 cm";
      }
    } else if (category === "Electronics") {
      if (size === "Small") {
        buffer = weightInGrams <= 100 ? "0.5 cm" : "1 cm";
      } else if (size === "Medium") {
        buffer = weightInGrams <= 500 ? "1.5 cm" : "2.5 cm";
      } else if (size === "Large") {
        buffer = weightInGrams <= 5000 ? "3 cm" : "4 cm";
      }
    } else if (category === "Metal") {
      if (size === "Small") {
        buffer = weightInGrams <= 100 ? "0.5 cm" : weightInGrams <= 200 ? "0.7 cm" : "N/A";
      } else if (size === "Medium") {
        buffer = weightInGrams <= 500 ? "1 cm" : "2 cm";
      } else if (size === "Large") {
        buffer = "3 cm";
      }
    }

    setBufferSize(buffer || "Buffer size not defined for selected inputs");
  };

  return (
    <div className="w-full max-w- mx-auto flex flex-col justify-center bg-gray-900 text-white">
      <div className="pt-8 text-center mb-6">
        <h2 className="text-4xl font-bold">Buffer Suggestions for your Product!!</h2>
      </div>
      <div id="tab2" className="tabcontent p-4">
        <div className="bg-gray-800 border-4 rounded-lg shadow relative m-10 flex flex-col md:flex-row">
          {/* Form Section */}
          <div className="flex-1 p-6">
            <div className="flex items-start justify-between p-5 border-b rounded-t">
              <h3 className="text-xl font-semibold">Buffer Suggestions</h3>
            </div>

            <div className="p-6 space-y-6">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="category" className="text-sm font-medium text-gray-300 block mb-2">
                      Select Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="shadow-sm bg-gray-700 border border-gray-600 text-gray-300 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      required
                    >
                      <option value="">Select Category of Your Product</option>
                      <option value="Glass">Glass</option>
                      <option value="Durable Plastic">Durable Plastic</option>
                      <option value="Non-Durable Plastic">Non-Durable Plastic</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Metal">Metal</option>
                    </select>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="size" className="text-sm font-medium text-gray-300 block mb-2">
                      Select Size
                    </label>
                    <select
                      id="size"
                      name="size"
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      className="shadow-sm bg-gray-700 border border-gray-600 text-gray-300 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      required
                    >
                      <option value="">Select Size of Your Product</option>
                      <option value="Small">1cm-10cm</option>
                      <option value="Medium">10cm-50cm</option>
                      <option value="Large">50cm+</option>
                    </select>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="unit" className="text-sm font-medium text-gray-300 block mb-2">
                      Select Unit
                    </label>
                    <select
                      id="unit"
                      name="unit"
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      className="shadow-sm bg-gray-700 border border-gray-600 text-gray-300 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      required
                    >
                      <option value="">Select Unit of Weight of Your Product</option>
                      <option value="gram">gram</option>
                      <option value="Kilogram">Kilogram</option>
                    </select>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="weight" className="text-sm font-medium text-gray-300 block mb-2">
                      Product's Weight
                    </label>
                    <input
                      type="number"
                      name="weight"
                      id="weight"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="shadow-sm bg-gray-700 border border-gray-600 text-gray-300 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      placeholder="Enter weight"
                      required
                    />
                  </div>
                </div>

                <div className="p-6 border-t border-gray-600 rounded-b">
                  <button
                    className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    type="submit"
                  >
                    Suggestions
                  </button>
                </div>

                {bufferSize && (
                  <div className="mt-4 text-center text-lg font-medium">
                    Suggested Buffer Size: {bufferSize}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BufferingCalculation;