import { SignupForm } from "@/components/ui/signup-form";
import Image from "next/image";


export default function SignupPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start"></div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm />
          </div>
        </div>
      </div>

      <div className="relative hidden lg:block w-full min-h-screen">
        <Image
          src="/agraslogin.png"
          alt="Login"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover"
          priority
        />
      </div>
    </div>
  );
}
