import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <div className="flex items-center justify-center w-full lg:w-1/2 p-8">
        <form className="w-full max-w-md">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-medium">Sign up</h1>
            <p className="text-sm text text-foreground">
              Already have an account?{" "}
              <Link
                className="text-primary font-medium underline"
                href="/sign-in"
              >
                Sign in
              </Link>
            </p>
            <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
              <Label htmlFor="name">Nome</Label>
              <Input name="name" placeholder="Your name" required />
              <Label htmlFor="phone">Telefone</Label>
              <Input name="phone" placeholder="Your phone" required />
              <Label htmlFor="email">Email</Label>
              <Input name="email" placeholder="you@example.com" required />
              <Label htmlFor="password">Senha</Label>
              <Input
                type="password"
                name="password"
                placeholder="Sua senha"
                minLength={6}
                required
              />
              <SubmitButton
                className="bg-[#8ABF17] text-white"
                formAction={signUpAction}
                pendingText="Criando conta..."
              >
                Criar conta
              </SubmitButton>
              <FormMessage message={searchParams} />
            </div>
          </div>
        </form>
      </div>

      <div className="hidden lg:block w-1/2 h-screen">
        <Image
          src="/agraslogin.png"
          alt="Login"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
          priority
        />
      </div>
    </div>
  );
}
