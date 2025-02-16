import { createClient } from "@/utils/supabase/server";

export const getMembers = async (communityId: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("communities")
    .select("members")
    .eq("id", communityId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data.members;
};
