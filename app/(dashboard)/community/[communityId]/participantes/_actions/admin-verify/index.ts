import { createClient } from "@/utils/supabase/server";

export const adminVerify = async (communityId: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("communities")
    .select("admin_id")
    .eq("id", communityId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data.admin_id;
};