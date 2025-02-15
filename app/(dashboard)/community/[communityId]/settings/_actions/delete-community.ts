"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function deleteCommunity(formData: FormData) {
  const communityId = formData.get("communityId") as string;
  const supabase = await createClient();

  // Verifica autenticação e permissão
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: community } = await supabase
    .from("communities")
    .select("admin_id")
    .eq("id", communityId)
    .single();

  if (!community || community.admin_id !== user?.id) {
    throw new Error("Você não tem permissão para excluir esta comunidade");
  }

  // Deleta a comunidade
  const { error } = await supabase
    .from("communities")
    .delete()
    .eq("id", communityId);

  if (error) {
    throw new Error("Falha ao excluir a comunidade");
  }

  return { success: true, redirect: "/communities" };
}
