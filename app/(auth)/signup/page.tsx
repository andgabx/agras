import { SignupForm } from "@/components/ui/signup-form";
import Image from "next/image";

export default function SignupPage() {
  return (
      <div className="grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-col gap-4 p-6 md:p-10 bg-white drop-shadow-2xl rounded-r-[96px]">
          <div className="flex justify-center gap-2 md:justify-start"></div>
          <div className="flex flex-1 items-center justify-center">
            <div className="">
              <SignupForm />
            </div>
          </div>
        </div>

        <div className="hidden lg:flex items-center justify-center w-full min-h-screen">
          <Image
            src="/login-image.png"
            alt="Login"
            width={650}
            height={650}
            className="p-4"
            priority
          />
        </div>
      </div>
  );
}
