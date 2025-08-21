import Image from "next/image";

import { LoginForm } from "@/components/auth/login-form";
import Background from "@/components/auth/background";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Image src="/images/logo.png" alt="Logo" width={50} height={50} />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Background />
      </div>
    </div>
  );
}
