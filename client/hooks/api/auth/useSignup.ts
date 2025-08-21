"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Http from "@/utils/http";
import { getErrorMessage } from "@/utils/error-messages";
import type { Dictionary } from "ts-wiz";

export interface SignupRequest extends Dictionary {
  name: string;
  email: string;
  password: string;
}

export interface SignupResponse extends Dictionary {
  message: string;
  data: unknown;
}

export const useSignup = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: SignupRequest): Promise<SignupResponse> => {
      return Http.post<SignupResponse>({
        url: "/api/auth/register",
        data,
      });
    },
    onSuccess: (response) => {
      toast.success("ثبت نام با موفقیت انجام شد");

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
        serverMessage || "خطا در ثبت نام"
      );

      toast.error("خطا در ثبت نام");
    },
  });
};
