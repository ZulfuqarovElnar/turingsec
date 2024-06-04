import { useQuery } from "react-query";

import { getProgramById } from "../actions/getProgramById";

export function useGetProgramById(id: string) {
 
  return useQuery(["program", id], () => getProgramById(id));
}
