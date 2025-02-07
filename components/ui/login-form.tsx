"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IconBrandGoogle } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { loginWithEmail } from "@/lib/supabase/_auth/auth-login";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { error } = await loginWithEmail({ email, password });

      if (error) throw error;

      router.push("/dashboard");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
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
          <h1 className="text-[50px] font-bold mb-1">Login</h1>
          <p className="text-balance text-[18px] font-medium">
            Seja bem vindo(a) novamente!
          </p>
        </div>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Input
            id="email"
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Input
            id="password"
            type="password"
            required
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex items-center">
            <a
              href="#"
              className="ml-auto text-sm text-[#8ABF17] underline-offset-4 hover:underline"
            >
              Esqueceu sua senha?
            </a>
          </div>
        </div>
        <Button
          type="submit"
          className="w-full bg-[#8ABF17]"
          disabled={loading}
        >
          Entrar
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-[#8ABF17]">
            Ou continue com
          </span>
        </div>
        <Button variant="outline" className="w-full">
          <IconBrandGoogle className="size-4" />
          Login com Google
        </Button>
      </div>
      <div className="text-center text-sm">
        Não tem uma conta?{" "}
        <Link href="/signup" className="text-[#8ABF17] hover:text-[#739E13] underline underline-offset-4">
          Cadastre-se
        </Link>
      </div>
    </form>
  );
}
