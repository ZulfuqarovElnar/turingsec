export default function OpportunitiesBox({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="bg-[#3D0436] rounded-2xl py-4 px-6">
      <h2 className="mb-2 text-[20px] font-[700]">{title}</h2>
      <p className="font-[400] text-[20px]">{text}</p>
    </div>
  );
}
