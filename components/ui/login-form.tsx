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
import { loginWithEmail } from "@/lib/supabase/_actions/auth-login";

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
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col space-y-4 justify-start gap-2 text-center">
        <Image
          src="/agrasloginlogo.png"
          alt="Login"
          width={1920}
          height={3000}
        />
        <h1 className="text-2xl  font-bold">Login</h1>
        <p className="text-balance text-xl font-bold">
          Seja bem vindo (a) de volta!
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Senha</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Esqueceu sua senha?
            </a>
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
          Login
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-green-600">
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
        <Link href="/signup" className="underline underline-offset-4">
          Cadastre-se
        </Link>
      </div>
    </form>
  );
}
