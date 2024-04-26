import { useQuery } from "react-query";
import { GetCompanyProgram } from "../actions/getCompanyProgram";

export const useGetCompanyProgram = () => {
  return useQuery("companyProgram", async () => GetCompanyProgram());
};
