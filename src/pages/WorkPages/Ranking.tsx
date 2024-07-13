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
      <section className="   font-[800] bg-[#200F23] h-[124px] flex items-center justify-center overflow-hidden ">
        <img
          src="/assets/iconnav5.svg"
          alt=""
          className="absolute z-[20] lg:-left-[10%] md:-left-[27%] sm:-left-[100px] top-0 w-[294px] md:w-[302px] -left-[150px]  "
        />
        <p className="md:text-[30px] text-[20px]">RANKING</p>
        <img
          src="/assets/iconnav6.svg"
          alt=""
          className="absolute z-[20] md:-right-[60px] top-0 lg:right-0 sm:-right-[10%] -right-[20%]    overflow-hidden w-[204px] md:w-[242px]"
        />
      </section>

      <div className="bg-[url(/assets/images/gauze-03.png)] bg-center bg-no-repeat flex-1 lg:px-20 sm:px-8 px-3  py-16">
        <Select
          styles={{
            control: (provided, state) => ({
              ...provided,
              backgroundColor: "#FFDE31",
              border: "none",
              color: "#000",
              borderRadius: "20px",
              width: "370px",
              height: "50px",
              padding: "0 10px",
              "&:hover": {
                borderColor: "none",
              },
            }),
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isFocused ? "#FFDE31" : "#FFDE31",
              ":hover": { backgroundColor: "#FFDE31" },
              color: state.isFocused ? "black" : "black",
            }),
            menuList: (provided, state) => ({
              ...provided,
              backgroundColor: "#FFDE31",
              color: "black",
              padding: "0",
            }),
            placeholder: (provided) => ({
              ...provided,
              color: "black",
            }),
            singleValue: (provided, state) => {
              const color = "black";
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
            <RankingLine data={data} index={i} key={i} /> //last addition "key"
          ))}
        </div>
      </div>
    </div>
  );
}
