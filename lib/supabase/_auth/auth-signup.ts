import { toast } from "@/hooks/use-toast";
import { supabase } from "../config";

interface SignUpProps {
  email: string;
  password: string;
}

export async function signUpWithEmail({ email, password }: SignUpProps) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    toast({
      title: "Conta criada com sucesso",
      description: "Você pode agora fazer login",
    });
    if (error) throw error;


    return { data, error: null };
  } catch (error) {
    toast({
      title: "Erro ao criar conta",
      description: "Verifique suas credenciais",
    });
    return { data: null, error };
  }
}


export async function signUpWithGoogle() {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}
