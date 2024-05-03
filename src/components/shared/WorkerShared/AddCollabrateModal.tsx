import React, { useEffect, useState } from "react";

export default function AddCollabrateModal({
  isOpen,
  setOpen,
  allUsers = [], // Provide a default value of an empty array
  collabrates,
  setCollabrates,
}) {
  function OnClose() {
    setOpen(false);
  }

  const [users, setUsers] = useState(allUsers);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!Array.isArray(allUsers)) {
      // Check if allUsers is not an array, if so, return
      return;
    }

    // Filter users based on search input
    const filteredUsers = allUsers.filter((item) =>
      item.username.toLowerCase().includes(search.toLowerCase())
    );

    setUsers(filteredUsers);
  }, [search, allUsers]);

  function handleAddCollabrated(item) {
    setCollabrates((prev) => [...prev, item]);
    setOpen(false);
  }

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-[10000000] flex items-center justify-center overflow-auto bg-black bg-opacity-50">
          <div className="relative bg-white w-96 p-8 rounded-md text-black">
           
            <h2 className="font-[600] sm:text-[18px] text-[16px]">
              Add Collaborated
            </h2>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="bg-slate-700 text-white focus-visible:outline-none focus-visible:ring-offset-0 px-3 py-1 rounded-2xl"
            />
            <div className="mt-4 border space-y-2 text-white py-4 h-[400px] overflow-scroll scrollbar-hide">
              {users.map((item, i) => (
                <div
                  className="flex items-center bg-[#0A273D] p-4 cursor-pointer rounded-2xl"
                  key={i}
                  onClick={() => handleAddCollabrated(item)}
                >
                  <div className="hexagon5 m-auto md:m-0 ">
                    <img src={"/assets/images/profileimage.jpeg"} alt="" />
                  </div>
                  <div className="flex-1 ml-4">
                    <h3 className="text-[18px] font-[600]">
                      {item?.username}
                    </h3>
                    <div className="flex items-center gap-2">
                      <img src="/assets/flag.svg" className="w-[18px] " />
                      <p className="text-[16px] font-[400]">
                        {item?.city || "city"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              onClick={OnClose}
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
}