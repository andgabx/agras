import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";

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
    <div className="flex bg-[#FAFAFA] h-screen">
      <div className="flex items-center rounded-r-[150px] bg-white justify-center w-full lg:w-1/2 p-8">
        <form className="w-full max-w-md">
          <div className="flex flex-col gap-2">
            <Image className="mx-auto pb-16" src="/agrasloginlogo.png" alt="Logo" width={300} height={100} />
            <h1 className="text-5xl font-bold">Cadastre-se</h1>
            <p className="text-xl font-medium text-foreground">
              Seba bem vindo(a) ao AGRAS!
            </p>
            
            <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
              <Label className="font-bold" htmlFor="name">Nome</Label>
              <Input name="name" placeholder="Seu nome" required />
              <Label className="font-bold" htmlFor="phone">Telefone</Label>
              <Input name="phone" placeholder="Seu telefone" required />
              <Label className="font-bold" htmlFor="email">Email</Label>
              <Input name="email" placeholder="seu@email.com" required />
              <Label className="font-bold" htmlFor="password">Senha</Label>
              <Input
                type="password"
                name="password"
                placeholder="Sua senha"
                minLength={6}
                required
              />
              <div className="flex items-center gap-2">
                <Checkbox id="terms" required />
                <Label className="font-bold text-sm">Eu concordo com as políticas de privacidade e termos de uso</Label>
              </div>
              <SubmitButton
                className="bg-[#8ABF17] text-white"
                formAction={signUpAction}
                pendingText="Criando conta..."
              >
                Criar conta
              </SubmitButton>
              <FormMessage message={searchParams} />
              <p className="text-sm text text-foreground">
              Já tem uma conta?{" "}
              <Link
                className="text-[#8ABF17] font-medium underline"
                href="/sign-in"
              >
                Entre aqui
              </Link>
            </p>
            </div>
          </div>
        </form>
      </div>

      <div className="hidden lg:block w-1/2 m-auto px-4">
        <Image
          src="/signup.png"
          alt="Login"
          width={500}
          height={500}
          className="mx-auto"
          priority
        />
      </div>
    </div>
  );
}
