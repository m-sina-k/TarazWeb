"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import Http from "@/utils/http";
import { getErrorMessage } from "@/utils/error-messages";
import type { Dictionary } from "ts-wiz";

export interface UpdateUserRequest extends Dictionary {
  name?: string;
  email?: string;
  profilePicture?: File;
}

export interface UpdateUserResponse extends Dictionary {
  message: string;
  data: Dictionary;
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      data: UpdateUserRequest
    ): Promise<UpdateUserResponse> => {
      const formData = new FormData();

      if (data.name) formData.append("name", data.name);
      if (data.email) formData.append("email", data.email);
      if (data.profilePicture)
        formData.append("profilePicture", data.profilePicture);

      return Http.put<UpdateUserResponse, Dictionary, FormData>({
        url: "/api/user/update",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("پروفایل با موفقیت به‌روزرسانی شد");
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
        serverMessage || "خطا در به‌روزرسانی پروفایل"
      );

      toast.error(errorMessage);
    },
  });
};
