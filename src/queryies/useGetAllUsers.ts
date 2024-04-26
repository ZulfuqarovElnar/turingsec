import { useQuery } from "react-query";

import { getAllUsers } from "../actions/getAllUsers";

export function useGetAllUsers() {
  return useQuery("allUsers", getAllUsers);
}
