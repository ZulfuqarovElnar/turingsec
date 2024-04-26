import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="sm:px-16 px-8 pb-4 bg-[#0C2F47] py-4 flex justify-between flex-col lg:flex-row">
      <div className="flex gap-4 my-8 ">
        <div>
          <h2 className="font-bold text-[32px] ">
            <img
              src="/assets/images/whitelogo.png"
              alt=""
              className="w-[182px]"
            />
          </h2>
          <div className="flex flex-col mt-6 space-y-2">
            <Link to="/aboutus" className={`  text-white text-[18px]`}>
              About us
            </Link>
            <Link to="/leaderboard" className={`   text-white text-[18px]`}>
              Leaderboard
            </Link>
            <Link
              to="/bugbountyprograms"
              className={`  text-white text-[18px]`}
            >
              Bug Bounty programs
            </Link>
            <Link to="/opportunities" className={` text-white text-[18px]`}>
              Opportunities
            </Link>
          </div>
        </div>
        <div className="mt-16 sm:ml-16 min-w-24 ml-8">
          <Link to="/joinus" className={`  text-white text-[18px]`}>
            Contact Us
          </Link>
        </div>
      </div>
      <div className="mr-[10%]">
        <div className="space-x-4 lg:mt-8 mb-6 mt-2">
          <button>
            <a href="#">
              <img src="/assets/images/instagram.svg" alt="instagramlogo" />
            </a>
          </button>
          <button>
            <a href="#">
              <img src="/assets/images/facebook.svg" alt="facebooklogo" />
            </a>
          </button>
          <button>
            <a href="#">
              <img src="/assets/images/linkedin.svg" alt="linkedinlogo" />
            </a>
          </button>
        </div>
        <p className="text-white text-[20px] font-medium">
          Get in touch with us
        </p>
        <div className="sm:space-x-4 space-x-0">
          <input
            type="email"
            placeholder="E-mail"
            className="text-black px-6 rounded-3xl py-2  mt-4 outline-none placeholder:text-black"
          />
          <button className="text-white border-2 border-white px-6 py-2 rounded-3xl hover:scale-110 transition-all duration-300 sm:inline block mt-4 sm:mt-0 w-[230px] sm:w-auto">
            Send
          </button>
        </div>
      </div>
    </footer>
  );
}
