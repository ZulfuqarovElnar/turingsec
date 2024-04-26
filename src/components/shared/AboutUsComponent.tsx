import { ReactNode } from "react";

export default function AboutUsComponent({
  icon,
  title,
  text,
}: {
  title: string;
  text: string;
  icon: ReactNode;
}) {
  return (
    <div className="flex mt-4 gap-6 mb-20 text-left">
      <div className="xl:w-[40px] w-auto xl:h-[40px] h-auto">{icon}</div>
      <div>
        <h3 className="text-[20px] font-[700] mb-3 pt-1">{title}</h3>
        <p className="text-[20px] font-[400] sm:w-[336px] w-auto ">{text}</p>
      </div>
    </div>
  );
}
