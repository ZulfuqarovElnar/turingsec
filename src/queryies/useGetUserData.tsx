import { useQuery } from "react-query";
import { getUserData } from "../actions/getUserData";

export const useGetUserData = () => {
    return useQuery("userdata", async () => (getUserData()));
};
