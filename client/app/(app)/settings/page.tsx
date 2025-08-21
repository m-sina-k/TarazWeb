"use client";

import { useState, useEffect } from "react";
import { PageLayout } from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetCurrentUser } from "@/hooks/api/user/useGetCurrentUser";
import { useUpdateUser } from "@/hooks/api/user/useUpdateUser";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Camera } from "lucide-react";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { ErrorState } from "@/components/common/error-state";
import { Card } from "@/components/ui/card";

export default function AccountSettingsPage() {
  const { data: userData, isError } = useGetCurrentUser();
  const updateUser = useUpdateUser();
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      profilePicture: undefined as File | undefined,
    },
  });

  useEffect(() => {
    if (userData?.user) {
      form.reset({
        name: userData.user.name || "",
        email: userData.user.email || "",
        profilePicture: undefined,
      });
      if (userData.user.profilePicture) {
        setPreview(null);
      }
    }
  }, [
    userData?.user?.name,
    userData?.user?.email,
    userData?.user?.profilePicture,
  ]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("profilePicture", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: {
    name: string;
    email: string;
    profilePicture?: File;
  }) => {
    await updateUser.mutateAsync({
      name: data.name,
      email: data.email,
      profilePicture: data.profilePicture,
    });
  };

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (isError) {
    return (
      <PageLayout title="حساب کاربری" subtitle="مدیریت اطلاعات حساب کاربری">
        <Card>
          <ErrorState />
        </Card>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="حساب کاربری" subtitle="مدیریت اطلاعات حساب کاربری">
      <div className="space-y-6 max-w-[450px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={preview || userData?.user?.profilePicture || undefined}
                  alt={userData?.user?.name}
                />
                <AvatarFallback className="text-2xl">
                  {getInitials(userData?.user?.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <Label htmlFor="profilePicture" className="cursor-pointer">
                  <Button type="button" variant="outline" asChild>
                    <span>
                      <Camera className="ml-2 h-4 w-4" />
                      تغییر تصویر پروفایل
                    </span>
                  </Button>
                </Label>
                <Input
                  id="profilePicture"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نام</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ایمیل</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={updateUser.isPending}
              className="min-w-32"
            >
              {updateUser.isPending ? (
                <LoadingSpinner size="sm" variant="white" />
              ) : (
                "ذخیره تغییرات"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </PageLayout>
  );
}
