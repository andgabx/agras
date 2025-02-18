import { createClient } from "@/utils/supabase/server";

const uploadProfilePicture = async (file: File) => {
  const supabase = await createClient();
  const fileName = `${Date.now()}-${file.name}`;

  const { data, error } = await supabase.storage
    .from("Uploads")
    .upload(`User/${fileName}`, file);

  if (error) throw error;

  const { data: urlData } = supabase.storage
    .from("Uploads")
    .getPublicUrl(data.path);

  return urlData.publicUrl;
};

export default uploadProfilePicture;
