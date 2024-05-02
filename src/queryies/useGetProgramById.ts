import { useQuery } from "react-query";

import { getProgramById } from "../actions/getProgramById";

export function useGetProgramById(id: string) {
  console.log(id, "sduiiooooooooooooooooo");
  return useQuery(["program", id], () => getProgramById(id));
}
