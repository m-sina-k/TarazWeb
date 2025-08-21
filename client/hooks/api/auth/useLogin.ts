"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Http from "@/utils/http";
import Cookies from "@/utils/cookies";
import { ACCESS_TOKEN_COOKIE_KEY } from "@/constants/http";
import { getErrorMessage } from "@/utils/error-messages";
import type { Dictionary } from "ts-wiz";

export interface LoginRequest extends Dictionary {
  email: string;
  password: string;
}

export interface LoginResponse extends Dictionary {
  message: string;
  user: {
    name: string;
    email: string;
    profilePicture: string | null;
  };
  accessToken: string;
  expiresAt: string;
}

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: LoginRequest): Promise<LoginResponse> => {
      return Http.post<LoginResponse>({
        url: "/api/auth/login",
        data,
      });
    },
    onSuccess: (response) => {
      if (response.accessToken) {
        Cookies.set(ACCESS_TOKEN_COOKIE_KEY, response.accessToken);
      }

      toast.success("با موفقیت وارد شدید");

      router.push("/");
    },
    onError: (error: unknown) => {
      const errorResponse = error as {
        response?: {
          data?: {
            message?: string;
            errorCode?: string;
          };
        };
        message?: string;
      };

      const errorCode =
        errorResponse?.response?.data?.errorCode ||
        (errorResponse as { errorCode?: string })?.errorCode;
      const serverMessage = errorResponse?.response?.data?.message;

      const errorMessage = getErrorMessage(
        errorCode,
        serverMessage || "خطا در ورود به سیستم"
      );

      toast.error(errorMessage);
    },
  });
};
