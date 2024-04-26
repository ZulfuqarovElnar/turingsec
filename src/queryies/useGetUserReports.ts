import { useQuery } from "react-query";
import { getUserReports } from "../actions/getUserReports";

export function useGetUserReports() {
  return useQuery("userReports", getUserReports);
}
