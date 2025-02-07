import { supabase } from "../config";
import { toast } from "@/hooks/use-toast";
interface LoginProps {
  email: string;
  password: string;
}

export async function loginWithEmail({ email, password }: LoginProps) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    toast({
      title: "Login realizado com sucesso",
      description: "Você está logado",
    });
    if (error) {
      toast({
        title: "Erro ao fazer login",
        description: "Verifique suas credenciais",
      });
      throw error;
    }




    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function loginWithGoogle() {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    toast({
      title: "Login realizado com sucesso",
      description: "Você está logado",
    });



    if (error) {
      toast({
        title: "Erro ao fazer login",
        description: "Verifique suas credenciais",
      });
      throw error;
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
} 