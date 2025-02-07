import { LoginForm } from "@/components/ui/login-form";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10 bg-white drop-shadow-2xl">
        <div className="flex justify-center gap-2 md:justify-start"></div>
        <div className="flex flex-1 items-center justify-center">
          <div className="">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="hidden lg:flex items-center justify-center w-full min-h-screen">
        <Image
          src="/agraslogin.png"
          alt="Login"
          width={1920}
          height={1080}
          priority
          className="w-full h-screen object-cover"
        />
      </div>
    </div>
  );
}
