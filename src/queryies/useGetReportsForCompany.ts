import { useQuery } from "react-query";
import { getAllReportsForCompany } from "../actions/getAllReportsForCompay";

export function useGetReportsForCompanies() {
  return useQuery("reportsForCompanies", getAllReportsForCompany);
}
