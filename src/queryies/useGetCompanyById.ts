import { useQuery } from "react-query";

import { getCompanyById } from "../actions/getCompanyById";

export function useGetCompanyById(id: string) {
  return useQuery(["company", id], () => getCompanyById(id));
}
