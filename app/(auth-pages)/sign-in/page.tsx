import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import Image from "next/image";

export default async function Login(props: { searchParams: Promise<Message> }) {
  
  const searchParams = await props.searchParams;
  return (
    <div className="flex h-screen">
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8">
        <form className="flex-1 flex flex-col max-w-md">
          <Image
            className="mx-auto pb-16"
            src="/agrasloginlogo.png"
            alt="Logo"
            width={300}
            height={100}
          />

          <h1 className="text-5xl font-bold">Login</h1>
          <p className="text-[18px] py-4 font-medium text-foreground">
            Seja bem vindo(a) novamente!
          </p>
          <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
            <Label htmlFor="email">Email</Label>
            <Input name="email" placeholder="exemplo@email.com" required />
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Senha</Label>
            </div>
            <Input
              type="password"
              name="password"
              placeholder="Sua senha"
              required
            />
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 py-4">
                <Checkbox id="remember" />
                <Label className="text-[15px]" htmlFor="remember">
                  Lembrar-me
                </Label>
              </div>
              <Link
                className="text-[14px] hover:text-[#8ABF17]/90 text-[#8ABF17] underline py-4"
                href="/forgot-password"
              >
                Esqueceu sua senha?
              </Link>
            </div>

            <SubmitButton pendingText="Entrando..." formAction={signInAction}>
              Entrar
            </SubmitButton>
            <FormMessage message={searchParams} />
          </div>
          <p className="text-center py-4 text-sm text-foreground">
            Não tem uma conta?{" "}
            <Link
              className="hover:text-[#8ABF17]/90 text-[#8ABF17] font-bold underline"
              href="/sign-up"
            >
              Cadastre-se
            </Link>
          </p>
        </form>
      </div>
      <div className="hidden lg:block relative w-1/2">
        <Image
          src="/agraslogin.png"
          alt="Authentication background"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
