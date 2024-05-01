import { useQuery } from "react-query";
import { getReportById } from "../actions/getReportById";
 

export function useGetReportById(id: string) {
    // console.log(id, "sduiiooooooooo report");
    return useQuery(["program", id], () => getReportById(id));
}
