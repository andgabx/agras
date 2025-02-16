"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function joinCommunity(
  communityId: string
): Promise<{ success?: string; error?: string }> {
  const supabase = createClient();

  // 1. Autenticação
  const { data: { user }, error: authError } = await (await supabase).auth.getUser();
  if (authError || !user) {
    console.error("Auth error:", authError);
    redirect("/sign-in");
  }

  try {
    // 2. Buscar comunidade com transaction
    const { data: community, error: fetchError } = await (await supabase)
      .from("communities")
      .select("members, members_count")
      .eq("id", communityId)
      .single();

    if (fetchError || !community) {
      console.error("Fetch error:", fetchError);
      return { error: "Comunidade não encontrada" };
    }

    // 3. Verificar membro existente
    const isMember = community.members?.some(
      (member: { id: string }) => member.id === user.id
    );
    
    if (isMember) {
      return { error: "Você já é membro" };
    }

    // 4. Preparar atualização
    const newMember = {
      id: user.id,
      name: user.user_metadata.full_name,
      email: user.email,
    };

    // 5. Executar update transacional
    const { error: updateError } = await (await supabase)
      .from("communities")
      .update({
        members: [...(community.members || []), newMember],
        members_count: (community.members_count || 0) + 1,
      })
      .eq("id", communityId);

    if (updateError) {
      console.error("Update error:", updateError);
      throw updateError;
    }

    return { success: "Entrou na comunidade!" };

  } catch (error) {
    console.error("Erro geral:", error);
    return { error: "Erro interno do servidor" };
  }
}