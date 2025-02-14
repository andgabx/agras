import { forgotPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";

export default async function ChangePasswordForm(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <div className="flex bg-[#FAFAFA] h-screen">
      <div className="flex items-center rounded-none lg:rounded-r-[120px] bg-white shadow-lg justify-center w-full lg:w-1/2 p-8">
        <form className="flex-1 flex flex-col max-w-md">
          <Image
            className="mx-auto pb-16"
            src="/agrasloginlogo.png"
            alt="Logo"
            width={300}
            height={100}
          />

          <h1 className="text-5xl font-bold">Resetar Senha</h1>
          <p className="text-[17px] py-4 font-medium text-foreground">
            Já tem uma conta?{" "}
            <Link
              className="text-[#8ABF17] hover:text-[#8ABF17]/90 underline"
              href="/sign-in"
            >
              Faça login
            </Link>
          </p>

          <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
            <Label htmlFor="email">Email</Label>
            <Input name="email" placeholder="exemplo@email.com" required />

            <SubmitButton
              pendingText="Enviando..."
              formAction={forgotPasswordAction}
              className="mt-4"
            >
              Enviar Instruções
            </SubmitButton>

            <FormMessage message={searchParams} />
          </div>

          <p className="text-center py-4 text-sm text-foreground">
            Não recebeu o e-mail?{" "}
            <Link
              className="text-[#8ABF17] hover:text-[#8ABF17]/90 font-bold underline"
              href="/forgot-password"
            >
              Reenviar
            </Link>
          </p>
        </form>
      </div>
      <div className="hidden lg:block w-1/2 m-auto px-4">
        <Image
          src="/esqueci-novo2.png"
          alt="Login"
          width={650}
          height={550}
          className="mx-auto"
          priority
        />
      </div>
    </div>
  );
}
