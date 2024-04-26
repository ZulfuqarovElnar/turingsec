export default function Box({ text, data }: { text: string; data?: number }) {
  return (
    <div className="bg-[#2451F5] p-6  rounded-3xl">
      <p className="text-[20px]  font-[600]">{data ? data : "00"}</p>
      <p className="text-[14px] font-[500]">{text}</p>
    </div>
  );
}
