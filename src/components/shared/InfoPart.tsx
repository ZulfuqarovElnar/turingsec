import { Button } from "../ui/button";

export default function InfoPart() {
  return (
    <div className="  sm:px-16  px-8  relative  bg-[#061723] py-16">
      <h2 className="font-[800] text-[32px] py-6 text-white sm:w-[433px] w-[177px]">
        About Us
      </h2>
      <div className="flex  flex-col-reverse xl:flex-row items-center  z-10  sm:pb-[200px] pb-2 xl:pb-14 overflow-hidden  ">
        <div className=" mt-2 lg:text-left lg:mt-0  lg:px-0 text-white static sm:absolute  top-[600px]  xl:static  ">
          <h2 className="xl:text-[30px] md:text-[25px]  lg:leading-[40px] mb-8 mt-2  text-[20px] leading-[30px] font-[600] sm:w-[581px] w-[auto]">
            Enabling global efforts to create a more secure online environment
          </h2>
          <p className="   md:text-[20px] font-[500] mb-6 text-[18px] sm:w-[545px]">
            At TuringSec, we believe in the power of collaboration. Our mission
            is to connect talented security researchers with organizations
            worldwide, creating a robust ecosystem where vulnerabilities are
            identified, reported, and swiftly resolved.
          </p>
          <Button
            className="bg-[#FFDE31] hover:bg-[#FFDE31]
            text-black mt-4 rounded-xl hover:scale-105 transition-all duration-300 px-8 font-[800]"
          >
            <p> More information</p>
            <img
              src="/assets/images/rightarrow.svg"
              alt=""
              width={20}
              className="ml-4"
            />
          </Button>
        </div>

        <img
          src="/assets/images/mix-image2.png"
          alt=""
          className="xl:absolute xl:right-20 xl:-top-2 sm:relative sm:-top-24 sm:h-[auto] h-[300px] relative "
        />
      </div>
    </div>
  );
}
