import { useEffect, useState } from "react";

export default function CollabrateBox({
  percent,
  setPercent,
  globalPercentage,
  username,
  city,
  index,
  setCollabrates,
  id,
}: {
  percent: number;
  setPercent: (value: number) => void;
  globalPercentage: number;
  username: string;
  city: string;
  index: number;
  setCollabrates: (value: number) => void;
  id: number;
}) {
  const [value, setValues] = useState<number | null>(null);
  function handleChange(e) {

    if (e.target.value >= globalPercentage && percent === 0) {
      setValues(globalPercentage);
      setPercent((prev) => prev - value + globalPercentage);
      return;
    } else if (
      e.target.value > globalPercentage - percent + Number(value) &&
      e.target.value > value
    ) {
      setPercent(
        (prev) => prev - value + globalPercentage - percent + Number(value)
      );

      setValues(globalPercentage - percent + Number(value));
      return;
    } else if (isNaN(e.target.value) || e.target.value < 0) {
      setValues(0);
      return;
    }
   
    setPercent((prev) => prev - value + Number(e.target.value));
    setValues(e.target.value);
  }
  function handleDelete() {
    
    setPercent((percent) => percent - Number(value));
    setCollabrates((prev) => prev.filter((item) => item && item.id !== id));
  }
  useEffect(() => {
    if (id !== undefined && value !== null) {
        setCollabrates((prev) => prev.map((item) => {
            if (item && item.id === id) {
              return { ...item, collaborationPercentage: value };
            }
            return item;
          })
        
        );
    }
}, [value, id]);
 
  

  return (
    <div className="bg-[#3D0436]  px-5 sm:px-14 py-6 rounded-2xl flex items-center justify-between w-full relative">
      {!(index == 0) && (
        <button
          className="absolute top-2 right-6 text-red-600"
          onClick={handleDelete}
        >
          X
        </button>
      )}
      <div className="flex items-center">
        <div className="hexagon5 m-auto md:m-0 ">
          <img src={"/assets/images/profileimage.jpeg"} alt="" />
        </div>
        <div className="flex-1 ml-4">
          <h3 className="text-[18px] font-[600]">{username}</h3>
          <div className="flex items-center gap-2">
            <img src="/assets/flag.svg" className="w-[18px] " />
            <p className="text-[16px] font-[400]">{city}</p>
          </div>
        </div>
      </div>
      <div
        className="bg-[#001D34] rounded-l-xl 
    rounded-r-xl
    overflow-hidden flex"
      >
        <input
          type="number"
          className="w-[50px] py-1 px-3 bg-[#FFDE31] border-r border-black text-black focus:outline-none focus-visible:ring-0"
          value={value || ""}
          onChange={handleChange}
          style={{
            /* Chrome, Safari, Edge, Opera */
            WebkitAppearance: 'none',
            margin: 0,
            /* Firefox */
            MozAppearance: 'textfield'
          }}
        />

        <div
          className="bg-[#FFDE31]  w-[50px] text-black  flex items-center 
     
      justify-center "
        >
          %
        </div>
      </div>
    </div>
  );
}
