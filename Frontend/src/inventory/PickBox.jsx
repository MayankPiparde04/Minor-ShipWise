import React from "react";
import { FaBox } from 'react-icons/fa'; // React Icon for cart/cart add
import gigaBoxImage from '../assets/cartons/GIGA.png';
import megaBoxImage from '../assets/cartons/MEGA.png';
import midBoxImage from '../assets/cartons/MID.png';
import miniBoxImage from '../assets/cartons/MINI.png';
import nanoBoxImage from '../assets/cartons/NANO.png';
import tallBoxImage from '../assets/cartons/TALL[1].png';

const PickBox = () => {
  // Product data array
  const products = [
    {
      image: nanoBoxImage,
      label: 'NanoBox',
      size: '10x10x10',
      category: 'Small Size',
      id: 1
    },
    {
      image: midBoxImage,
      label: 'Macro Box',
      size: '20x20x20',
      category: 'Medium Size',
      id: 2
    },
    {
      image: megaBoxImage,
      label: 'Jumbo Box',
      size: '30x30x30',
      category: 'Large Size',
      id: 3
    },
    {
      image: gigaBoxImage,
      label: 'Super Jumbo Box',
      size: '40x40x40',
      category: 'Extra Large Size',
      id: 4
    },
    {
      image: miniBoxImage,
      label: 'Short Box',
      size: '20X10X10',
      category: 'Short Size',
      id: 5
    },
    {
      image: tallBoxImage,
      label: 'Tall Box',
      size: '20X10X70',
      category: 'Tall Size',
      id: 6
    },
  ];

  return (
    <div className="bg-gray-900 text-gray-100">

      {/* Header Section */}
      <div className="text-center p-10">
        <h1 className="font-bold text-4xl mb-4 text-cyan-400">Box Sizes That Match Your Transport Needs</h1>
        <h2 className="text-3xl">From compact cars to large trucks, we’ve got the perfect box size.</h2>
      </div>

      {/* Grid Section */}
      <section
        id="Projects"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6 mx-auto"
      >
        {products.map((product) => (
          <div key={product.id} className="w-full bg-gray-800 shadow-lg rounded-xl duration-300 hover:scale-105 hover:shadow-2xl">
            <a href="/" className="block">
              <img
                src={product.image}
                alt={product.label}
                className="h-64 w-full object-cover rounded-t-xl"
              />
              <div className="px-4 py-3">
                <span className="text-gray-400 text-xs uppercase">{product.category}</span>
                <p className="text-lg font-bold text-white capitalize">{product.label}</p>
                <p className="text-sm font-semibold text-gray-300">{product.size}</p>
                <div className="flex items-center mt-3">
                  <p className="text-lg font-semibold text-black cursor-auto my-3">{product.size}</p>
                  <div className="ml-auto">
                    <FaBox className="w-5 h-5 text-cyan-400" />
                  </div>
                </div>
              </div>
            </a>
          </div>
        ))}
      </section>

      {/* Footer Section */}
      <div className="text-center py-10">
        <h2 className="font-bold text-2xl md:text-4xl mb-4 text-cyan-400">
          Your Perfect Box is Just a Click Away – Choose Your Ideal Box Now!
        </h2>
      </div>

    </div>
  );
};

export default PickBox;
