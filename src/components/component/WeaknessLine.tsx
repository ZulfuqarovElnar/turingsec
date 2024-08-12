import { useSearchParams } from "react-router-dom";

interface WeaknessLineProps {
  text: string;
  handleClick: () => void;
}

export default function WeaknessLine({ text, handleClick }: WeaknessLineProps) {
  const [searchParams] = useSearchParams();
  const line = searchParams.get("weaknessLine");

  return (
    <div
      className={`h-[70px] bg-[#2B0E2B] flex flex-col justify-center px-8 border-b border-black cursor-pointer
      hover:opacity-70 transition-all duration-300 ease-in-out  ${
        line === text ? "opacity-70" : ""
      }`}
      onClick={handleClick}
    >
      <p className="sm:text-[16px] text-[14px] font-[600]">{text}</p>
    </div>
  );
}
