// src/pages/Product.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { name: 'Potato Chip Machines', image: '/images/potato-chip-machine.jpg' },
  { name: 'Nut Processing Machines', image: '/images/nut-processing.jpg' },
  { name: 'Vegetable & Fruit Equipment', image: '/images/vegetable-fruit.jpg' },
  { name: 'Grain Processing Machines', image: '/images/grain-processing.jpg' },
  { name: 'Food Packaging Machines', image: '/images/food-packaging.jpg' },
  { name: 'Pasta Machines', image: '/images/pasta-machines.jpg' },
  { name: 'Juice Machines', image: '/images/juice-machines.jpg' },
  { name: 'Snack Machinery', image: '/images/snack-machinery.jpg' },
  { name: 'Mobile Food Carts', image: '/images/food-carts.jpg' },
  { name: 'Ice Cream Machines', image: '/images/ice-cream.jpg' },
  { name: 'Coffee Machines', image: '/images/coffee-machines.jpg' },
  { name: 'Other Food Equipment', image: '/images/other-equipment.jpg' },
];

const Product = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900">All Product Categories</h2>
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {categories.map((category, index) => (
            <div key={index} className="bg-white border rounded-lg shadow-lg overflow-hidden">
              <div className="relative group">
                <img src={category.image} alt={category.name} className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition">
                  <Link
                    to={`/product/${category.name.toLowerCase().replace(/ /g, '-')}`}
                    className="text-white bg-blue-600 p-2 rounded-md shadow-md"
                  >
                    View Machines
                  </Link>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold">{category.name}</h3>
                <p className="text-sm text-gray-600">Explore our wide range of {category.name} for your business needs.</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
