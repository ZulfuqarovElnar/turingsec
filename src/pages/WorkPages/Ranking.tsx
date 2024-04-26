import Select from "react-select";
import RankingLine from "../../components/component/Worker/RankingLine";
export default function Ranking() {
  const fakeDATA = [
    {
      label: "Max Bounty",
      value: 1000,
    },
    {
      label: "Total Bounty",
      value: 1000,
    },
    {
      label: "Average Bounty",
      value: 1000,
    },
    {
      label: "Submitted Bounty",
      value: 1000,
    },
    {
      label: "Collaborated Bounty",
      value: 1000,
    },
    {
      label: "Closed Bounty",
      value: 1000,
    },
  ];
  const fakeData = [
    {
      rank: "1st",
      huntername: "Username",
      hunderimage: "hj",
      country: "az",
      points: "100",
    },
    {
      rank: "1st",
      huntername: "Username",
      hunderimage: "hj",
      country: "az",
      points: "100",
    },
    {
      rank: "1st",
      huntername: "Username",
      hunderimage: "hj",
      country: "az",
      points: "100",
    },
    {
      rank: "1st",
      huntername: "Username",
      hunderimage: "hj",
      country: "az",
      points: "100",
    },
    {
      rank: "1st",
      huntername: "Username",
      hunderimage: "hj",
      country: "az",
      points: "100",
    },
    {
      rank: "1st",
      huntername: "Username",
      hunderimage: "hj",
      country: "az",
      points: "100",
    },
    {
      rank: "1st",
      huntername: "Username",
      hunderimage: "hj",
      country: "az",
      points: "100",
    },
    {
      rank: "1st",
      huntername: "Username",
      hunderimage: "hj",
      country: "az",
      points: "100",
    },
    {
      rank: "1st",
      huntername: "Username",
      hunderimage: "hj",
      country: "az",
      points: "100",
    },
    {
      rank: "1st",
      huntername: "Username",
      hunderimage: "hj",
      country: "az",
      points: "100",
    },
    {
      rank: "1st",
      huntername: "Username",
      hunderimage: "hj",
      country: "az",
      points: "100",
    },
  ];
  return (
    <div className="text-white flex-1 flex flex-col overflow-hidden min-h-screen relative">
      <section className="   font-[800] bg-[#1F44CC] h-[124px] flex items-center justify-center overflow-hidden ">
        <img
          src="/assets/iconnav5.svg"
          alt=""
          className="absolute z-[20] lg:-left-[10%] md:-left-[27%] sm:-left-[100px] top-0 w-[294px] md:w-[302px] -left-[150px]  "
        />
        <p className="md:text-[30px] text-[20px]">Ranking</p>
        <img
          src="/assets/iconnav6.svg"
          alt=""
          className="absolute z-[20] md:-right-[60px] top-0 lg:right-0 sm:-right-[10%] -right-[20%]    overflow-hidden w-[204px] md:w-[242px]"
        />
      </section>

      <div className="bg-[#1E1E1E] flex-1 lg:px-20 sm:px-8 px-3  py-16">
        <Select
          styles={{
            control: (provided, state) => ({
              ...provided,
              backgroundColor: "#1F44CC",
              border: "none",
              color: "white",
              borderRadius: "20px",
              width: "370",
              height: "50px",
              padding: "0 10px",
              "&:hover": {
                borderColor: "none",
              },
            }),
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isFocused ? "#1F44CC" : "#1F44CC",
              ":hover": { backgroundColor: "rgb(14 165 233)" },
              color: state.isFocused ? "white" : "white",
            }),
            menuList: (provided, state) => ({
              ...provided,
              backgroundColor: "#1F44CC",
              color: "white",
              padding: "0",
            }),
            placeholder: (provided) => ({
              ...provided,
              color: "white",
            }),
            singleValue: (provided, state) => {
              const color = "white";
              return { ...provided, color };
            },
          }}
          options={fakeDATA}
          isSearchable={false}
          isClearable={true}
          placeholder=" Period"
        />
        <div className="mt-8 rounded-[20px] overflow-hidden">
          {fakeData.map((data, i) => (
            <RankingLine data={data} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
