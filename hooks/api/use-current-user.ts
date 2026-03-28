import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUserQueryFn } from "@/lib/fetcher";

const UseCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUserQueryFn,
    staleTime: 0,
  });
};
export default UseCurrentUser;
