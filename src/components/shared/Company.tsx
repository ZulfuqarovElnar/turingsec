import CompanyBox from "../component/CompanyBox";

export default function Company() {
  return (
    <div className="px-16 pb-4">
      <h2 className="font-bold text-[32px] my-6">Company</h2>

      <div className="flex gap-4 p-4 overflow-scroll scrollbar-hide">
        <CompanyBox />
        <CompanyBox />
        <CompanyBox />
        <CompanyBox />
      </div>
    </div>
  );
}
