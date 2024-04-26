export default function NotificationBox({ active, text, date }) {
  return (
    <div
      className={`flex gap-4 ${
        active ? "bg-[#0A273D]" : ""
      }   lg:py-6 py-4 xl:px-4 px-2 w-full cursor-pointer xl:flex-row flex-col hover:bg-[#0A273D] transition-all duration-300`}
    >
      <p className="sm:text-[18px] text-[14px] font-[400] text-center lg:text-left">
        {date}
      </p>
      <p className="sm:text-[18px] text-[14px] font-[400] hidden lg:block">
        {text}
      </p>
    </div>
  );
}
