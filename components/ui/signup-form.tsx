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
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col space-y-4 justify-start gap-2 text-center">
        <Image
          src="/agrasloginlogo.png"
          alt="Login"
          width={1920}
          height={1080}
        />
        <h1 className="text-2xl font-bold">Cadastro</h1>
        <p className="text-balance text-xl font-bold">
          Seja bem vindo ao Agras!
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="seuemail@exemplo.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Senha</Label>
          </div>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-green-600"
          disabled={loading}
        >
          Cadastre-se
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-green-600">
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
        <Link href="/login" className="underline underline-offset-4">
          Faça login
        </Link>
      </div>
    </form>
  );
}
