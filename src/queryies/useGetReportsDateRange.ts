import { useQuery } from "react-query";
import { getReportsDateRange } from "../actions/getReportsDateRange";

export function useGetReportsDateRange(toDate?: Date, fromDate?: Date) {
    // Check if both dates are defined
    return useQuery(
        ["Ranged reports", toDate, fromDate],
        () => {
            if (!toDate || !fromDate) {
                return Promise.reject(new Error("Both 'toDate' and 'fromDate' must be defined"));
            }
            return getReportsDateRange(toDate, fromDate);
        },
        {
            // Only run the query if both toDate and fromDate are defined
            enabled: !!toDate && !!fromDate,
        }
    );
}
