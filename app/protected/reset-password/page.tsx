import { resetPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
export default async function ResetPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;

  return (
    <div className="min-h-screen flex items-center">
      <form className="border bg-background rounded-lg flex flex-col w-full max-w-md p-4 gap-2 [&>input]:mb-4 mx-auto">
        <h1 className="text-2xl font-medium">Mudar senha</h1>
        <p className="text-sm text-foreground/60">
          Por favor, insira sua nova senha abaixo.
        </p>
        <Label htmlFor="password">Nova senha</Label>
        <Input
          type="password"
          name="password"
          placeholder="Nova senha"
          required
        />
        <Label htmlFor="confirmPassword">Confirmar senha</Label>
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirmar senha"
          required
        />
        <SubmitButton formAction={resetPasswordAction}>
          Mudar senha
        </SubmitButton>
        <FormMessage message={searchParams} />
      </form>
    </div>
  );
}
