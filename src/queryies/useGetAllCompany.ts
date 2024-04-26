import { useQuery } from "react-query";
import { getAllCompany } from "../actions/getAllCompany";

export function useGetAllCompany() {
  return useQuery("allCompany", getAllCompany);
}
