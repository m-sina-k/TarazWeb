"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useSignup } from "@/hooks/api/auth/useSignup";
import { toast } from "sonner";
import { LoadingSpinner } from "../common/loading-spinner";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const signupMutation = useSignup();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("گذرواژه‌ها با هم مطابقت ندارند");
      return;
    }

    signupMutation.mutate({ name, email, password });
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">ثبت نام</h1>
        </div>
        <Field>
          <FieldLabel htmlFor="name">نام</FieldLabel>
          <Input
            id="name"
            type="text"
            placeholder="نام و نام خانوادگی"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={signupMutation.isPending}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">ایمیل</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="me@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={signupMutation.isPending}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">گذرواژه</FieldLabel>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={signupMutation.isPending}
          />
          <FieldDescription>باید حداقل 8 کاراکتر باشد.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password">تایید گذرواژه</FieldLabel>
          <Input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={signupMutation.isPending}
          />
        </Field>
        <Field>
          <Button type="submit" disabled={signupMutation.isPending}>
            {signupMutation.isPending ? (
              <LoadingSpinner size="sm" variant="white" />
            ) : (
              "ثبت نام"
            )}
          </Button>
        </Field>
        <Field>
          <FieldDescription className="px-6 text-center">
            حساب کاربری دارید؟{" "}
            <Link href="/login" className="underline underline-offset- px-1">
              وارد شوید
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
