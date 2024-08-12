import { useSearchParams } from "react-router-dom";

export default function Line({ text, asset }: { text: string; asset: any }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const line = searchParams.get("line");

  const handleClick = () => {
    const params = new URLSearchParams(searchParams);
    params.set("line", text); // Use the provided text or a default value
    setSearchParams(params);
  };

  return (
    <div
      className={`h-[70px] bg-[#2B0E2B] flex flex-col justify-center px-8 border-b border-black cursor-pointer
      hover:opacity-70 transition-all duration-300 ease-in-out ${
        line === text ? "opacity-70" : ""
      }`}
      onClick={handleClick}
    >
      <p className="sm:text-[16px] text-[14px] font-[600]">{text}</p>
    </div>
  );
}
