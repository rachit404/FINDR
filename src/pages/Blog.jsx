// src/pages/Blog.jsx
import React from 'react';

const Blog = () => {
  const reviews = [
    { id: 1, name: 'John Doe', review: 'Great machine for our bakery!', date: 'October 3, 2024' },
    { id: 2, name: 'Jane Smith', review: 'Helped streamline our processing line.', date: 'September 25, 2024' },
    // Add more reviews
  ];

  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900">Customer Reviews</h2>
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white border rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold">{review.name}</h3>
              <p className="text-sm text-gray-600">{review.review}</p>
              <p className="mt-4 text-xs text-gray-500">Posted on {review.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
