"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IconBrandGoogle } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signUpWithEmail } from "@/lib/supabase/_auth/auth-signup";

export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { error } = await signUpWithEmail({ email, password });

      if (error) throw error;

      router.push("/");
    } catch (error) {
      console.error("Erro ao criar conta:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSignUp}
      className={cn("flex flex-col gap-6 w-96 sm:w-[500px]", className)}
      {...props}
    >
      <div className="flex justify-center mb-12">
      <Image
          src="/agrasloginlogo.png"
          className=""
          alt="Login"
          width={220}
          height={220}
        />
      </div>
      <div className="flex flex-col space-y-4 gap-2 text-center">
        <div className="flex justify-start items-start flex-col mb-6">
          <h1 className="text-[50px] font-bold mb-1">Cadastre-se</h1>
          <p className="text-balance text-[18px] font-medium">
            Seja bem vindo(a) ao AGRAS!
          </p>
        </div>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Input
            id="email"
            type="email"
            placeholder="Email"
            className=""
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Input
            id="password"
            type="password"
            placeholder="Senha"
            className=""
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-[#8ABF17]"
          disabled={loading}
        >
          Cadastrar
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-[#8ABF17]">
            Ou
          </span>
        </div>
        <Button variant="outline" className="w-full">
          <IconBrandGoogle className="size-4" />
          Cadastre-se com Google
        </Button>
      </div>
      <div className="text-center text-sm">
        Já tem uma conta?{" "}
        <Link href="/" className="underline underline-offset-4 text-[#8ABF17] hover:text-[#739E13]">
          Entre aqui
        </Link>
      </div>
    </form>
  );
}
