import { useQuery } from "react-query";

import { getProgramById } from "../actions/getProgramById";

export function useGetProgramById(progtamId: string) {
  console.log(progtamId, "sduiiooooooooooooooooo");
  return useQuery(["program", progtamId], () => getProgramById(progtamId));
}
