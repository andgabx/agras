"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { CreateCommunitySchema } from "./schema";

const uploadCover = async (file: File) => {
  const supabase = await createClient();
  const fileName = `${Date.now()}-${file.name}`;

  const { data: uploadData, error } = await supabase.storage
    .from("Uploads")
    .upload(`Community/${fileName}`, file);

  if (error) throw error;

  const { data: urlData } = supabase.storage
    .from("Uploads")
    .getPublicUrl(uploadData.path);

  return urlData.publicUrl;
};

export const createCommunity = async (formData: FormData): Promise<void> => {
  const supabase = await createClient();

  // Obter o usuário atual
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Usuário não autenticado.");
  }

  const coverFile = formData.get("cover") as File;
  let coverUrl = null;

  if (coverFile && coverFile instanceof File) {
    coverUrl = await uploadCover(coverFile);
  }

  // Garantir que os valores não sejam nulos
  const name = formData.get("name")?.toString().trim();
  const admin_id = user.id;
  const creator_name = user.user_metadata.full_name;
  const description = formData.get("description")?.toString().trim();
  const city = formData.get("city")?.toString().trim();
  const state = formData.get("state")?.toString().trim();
  const members = [{ id: admin_id, name: creator_name, email: user.email }];

  const { success } = CreateCommunitySchema.safeParse({
    name,
    admin_id,
    description,
    city,
    state,
    creator_name,
    members,
    cover: coverUrl,
  });

  if (!success) {
    throw new Error("Dados inválidos.");
  }

  // Verificar se já existe uma comunidade com o mesmo nome (case insensitive)
  const { data: existingCommunity, error: searchError } = await supabase
    .from("communities")
    .select("name")
    .ilike("name", name || "")
    .maybeSingle();

  if (searchError) {
    throw new Error("Erro ao verificar o nome da comunidade.");
  }

  if (existingCommunity) {
    throw new Error(
      `Já existe uma comunidade chamada "${existingCommunity.name}". Por favor, escolha outro nome.`
    );
  }

  const { error: insertError } = await supabase.from("communities").insert({
    name,
    admin_id,
    description,
    city,
    state,
    creator_name,
    members,
    cover: coverUrl,
  });

  if (insertError) {
    throw new Error("Erro ao criar a comunidade: " + insertError.message);
  }

  revalidatePath("/communities");
};
