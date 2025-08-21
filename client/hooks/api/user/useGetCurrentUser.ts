"use client";

import { useQuery } from "@tanstack/react-query";
import Http from "@/utils/http";
import type { Dictionary } from "ts-wiz";

export interface User extends Dictionary {
  id: string;
  name: string;
  email: string;
  profilePicture: string | null;
}

export interface GetCurrentUserResponse extends Dictionary {
  message: string;
  user: User;
}

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: ["user", "current"],
    queryFn: async (): Promise<GetCurrentUserResponse> => {
      return Http.get<GetCurrentUserResponse>({
        url: "/api/user/current-user",
      });
    },
  });
};
