import { ReactNode } from "react";

export default function OpportunitiesHackerBox({
  icon,
  title,
  text,
  add,
}: {
  title: string;
  text: string;
  icon: ReactNode;
  add?: string;
}) {
  return (
    <div className={`text-center  ${add}`}>
      <div>{icon}</div>

      <h3 className="text-[20px] font-[700] mb-3 pt-1">{title}</h3>
      <p className="text-[20px] font-[400]  w-auto ">{text}</p>
    </div>
  );
}
