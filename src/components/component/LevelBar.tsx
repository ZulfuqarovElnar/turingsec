export default function LevelBar({
  color,
  level,
  label,
  className,
}: {
  color: string;
  level: number;
  label: string;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="bg-[#00467C] h-[8px] w-[100px] rounded-full">
        <div
          className={`bg-${color}-500 h-[8px] w-[${level}px] rounded-full`}
        ></div>
      </div>

      <p className="sm:text-[18px] text-[16px] font-[600]">{label}</p>
    </div>
  );
}
