import { useQuery } from "react-query";
import { getNotification } from "../actions/getNotification";
export const useGetNotification = () => {
    return useQuery("notification", async () => (getNotification()));
};
