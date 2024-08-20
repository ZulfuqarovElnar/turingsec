import { useQuery } from "react-query";
import { getAllReportsUsersById } from "../actions/getAllReportsUsersById";

export function useGetAllReportsUsersById(id: string) {
    return useQuery(["userReports", id], () => getAllReportsUsersById(id), {
        enabled: !!id, // Only run the query if an ID is provided
    });
}
