import React, { useState } from "react";

const Modal = ({ isOpen, onClose, onSubmit }) => {
  const [type, setType] = useState("");
  const [reward, setReward] = useState("");
  const [level, setLevel] = useState("");

  const handleAddReward = (e) => {
    e.preventDefault();
    // Add validation logic if needed
    onSubmit({ type, reward, level });
    setType("");
    setReward("");
    setLevel("");
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-[10000000] flex items-center justify-center overflow-auto bg-black bg-opacity-50">
          <div className="relative bg-white w-96 p-8 rounded-md text-black">
            {/* Modal content */}
            <h2 className="font-[600] sm:text-[18px] text-[16px]">
              Add Reward
            </h2>
            <form
              className="flex flex-col gap-4 mt-4"
              onSubmit={handleAddReward}
            >
              <input
                type="text"
                placeholder="Type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="border border-gray-200 p-2 rounded-md"
                required
              />
              <input
                type="text"
                placeholder="Reward"
                value={reward}
                onChange={(e) => setReward(e.target.value)}
                className="border border-gray-200 p-2 rounded-md"
                required
              />
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="border border-gray-200 p-2 rounded-md"
                required
              >
                <option value="">Select Level</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-md p-2"
              >
                Add
              </button>
            </form>
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              onClick={onClose}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
