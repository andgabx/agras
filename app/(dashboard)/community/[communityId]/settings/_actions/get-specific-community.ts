import { createClient } from "@/utils/supabase/server";

export async function getCommunity(id: string) {
  const supabase = await createClient();

  try {
    const { data: community, error } = await supabase
      .from("communities")
      .select("id, name, description, created_at")
      .eq("id", id)
      .single();

    if (error) {
      throw new Error("Falha ao buscar comunidade");
    }

    return community;
  } catch (error) {
    console.error("[GET_COMMUNITY]", error);
    throw new Error("Falha ao buscar comunidade");
  }
}
