"use server";

import { createClient } from "@/utils/supabase/server";

export type Community = {
  id: string;
  name: string;
  admin_id: string;
  members_count: number;
  created_at: string;
  description: string | null; 
  cover: string | null;
  city: string | null;
  state: string | null;
  creator_name: string;
  members: Array<string>;
};
export async function getCommunities() {
  const supabase = await createClient();

  const { data: communities, error } = await supabase
    .from("communities")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Erro ao buscar comunidades");
  }
  
  return communities as Community[];
}
