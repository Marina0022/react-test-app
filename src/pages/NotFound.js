import React from 'react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Oops! Something went wrong...</h1>
      <p className="text-lg text-gray-700">We're sorry, but an error occurred.</p>
    </div>
  );
};

export default NotFound;
