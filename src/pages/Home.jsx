import React from 'react';
import { Link } from 'react-router-dom';
import MachineCard from '../components/MachineCard';

const Home = () => {
  // Mock data for popular machines
  const popularMachines = [
    { id: 1, name: 'Potato Chip Slicer', image: '/path/to/image1.jpg', description: 'High-speed potato chip slicer for industrial use.' },
    { id: 2, name: 'Industrial Oven', image: '/path/to/image2.jpg', description: 'Large capacity industrial oven for baking.' },
    { id: 3, name: 'Packaging Machine', image: '/path/to/image3.jpg', description: 'Automated packaging machine for various food products.' },
    // ... add 3 more
  ];

  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <div className="relative bg-cover bg-center h-96" style={{backgroundImage: "url('/path/to/hero-image.jpg')"}}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            Welcome to F.I.N.D.R.
          </h1>
          <p className="mt-6 max-w-3xl text-xl text-gray-300">
            Discover quality & affordable food equipment to help you make profit
          </p>
        </div>
      </div>

      {/* Popular Machines Section */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900">Popular Machines</h2>
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {popularMachines.map((machine) => (
            <MachineCard key={machine.id} machine={machine} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/product" className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
            View All Machines
            <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Efficiency Banner */}
      <div className="bg-green-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Lower operating costs</span>
            <span className="block text-green-200">Efficient energy food processing machines</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link to="/product" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-green-600 bg-white hover:bg-green-50">
                Explore Machines
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Machine Categories Section */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900">Machine Categories</h2>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Add category cards here */}
        </div>
      </div>

      {/* Blog and Recommendation Preview */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          {/* Blog Preview */}
          <div>
            <h3 className="text-2xl font-extrabold text-gray-900">Latest from our Blog</h3>
            {/* Add blog preview content */}
          </div>
          {/* Recommendation Preview */}
          <div>
            <h3 className="text-2xl font-extrabold text-gray-900">Recommendation System</h3>
            <p className="mt-3 text-lg text-gray-500">
              Get personalized machine recommendations for your food business startup.
            </p>
            <div className="mt-8">
              <Link to="/recommendation" className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
                Get Recommendations
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;