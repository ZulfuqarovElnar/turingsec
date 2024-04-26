export default function CompanyBox() {
  return (
    <div className="rounded-xl overflow-hidden hover:cursor-pointer hover:scale-105 transition-all duration-300 md:min-w-[295px] min-w-[225px]">
      <div className=" flex justify-center">
        <img
          src="/assets/images/company.avif "
          alt=""
          className="object-cover"
        />
      </div>
      <div className=" bg-[#D9D9D9] dark:bg-slate-900 py-4 px-4 rounded-b-xl">
        <h3 className="font-bold text-[18px] ">Hackers nickname</h3>
        <p className="text-[16px] font-light ">
          informa tion informationinformati oninform ationinformati oninfo
          rmationi nformat ionin formation information
        </p>
        <div className="mt-2 flex justify-between">
          <p className="text-[16px] font-light">154 points</p>
          <button>
            <img src="/assets/images/plus.svg" alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}
