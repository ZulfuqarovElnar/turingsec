import { Button } from "../../ui/button";

export default function TabContentClose() {
  return (
    <div className="mt-4">
      <h2 className="sm:text-[23px] text-[16px] font-[600] mb-2 ">
        Close Account
      </h2>
      <p className="sm:text-[18px] text-[12px] font-[500]">
        By closing your account, you permanently lose access to your account,
        your data is no longer accessible and the recovery of your account is
        not possible.
      </p>
      <div className="mt-14 space-y-14">
        <p className="sm:text-[18px] text-[12px] font-[500]">
          To avoid any problems, please ensure the following before making the
          request:
          <li>your wallet balance is zero,</li>
          <li>
            there are no ongoing wallet transactions (that might fail and return
            the transaction amount to the wallet),
          </li>
          <li>
            all your reports are resolved and no longer requires your input,
          </li>
          <li> you exported all your data.</li>
        </p>
      </div>
      <div className="flex justify-end mt-4">
        <Button className="hover:scale-110 transition-all duration-300 rounded-xl h-[45px]  sm:h-[50px] w-full sm:w-[200px] bg-[#2451F5] text-white  sm:text-[18px] font-[600] text-[16px]   hover:bg-[#2451F5] ">
          Delete account
        </Button>
      </div>
    </div>
  );
}
