import React from 'react';

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gray-100 rounded-lg p-8 w-full sm:max-w-md">
        <h2 className="text-xl font-bold mb-4">Modal Title</h2>
        <p className="mb-4">Modal content goes here.</p>
        <button
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
