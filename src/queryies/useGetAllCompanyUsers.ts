import { useQuery } from "react-query";

import { getAllCompanyUsers } from "../actions/getAllCompanyUsers";

export function useGetAllCompanyUsers() {
  return useQuery("allCompanyUsers", getAllCompanyUsers);
}
