"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export default async function updateAccount(formData: FormData, pathname: string) {
  const supabase = await createClient();

  // Se houver um arquivo para upload
  const profileImage = formData.get("profileImage") as File;
  let avatarUrl = null;

  if (profileImage) {
    // Verificar se existe uma imagem antiga e deletá-la
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const oldAvatarUrl = user?.user_metadata?.avatar_url;

    if (oldAvatarUrl) {
      // Extrair o path do arquivo da URL do Supabase
      const pathRegex = /\/Uploads\/([^?]+)/;
      const match = oldAvatarUrl.match(pathRegex);
      const filePath = match ? match[1] : null;

      if (filePath) {
        const { error: deleteError } = await supabase.storage
          .from("Uploads")
          .remove([filePath]);

        if (deleteError) {
          console.error("Erro ao deletar imagem antiga:", deleteError);
        }
      }
    }

    // Upload da nova imagem
    const fileName = `${Date.now()}-${profileImage.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("Uploads")
      .upload(`User/${fileName}`, profileImage);

    if (uploadError) throw uploadError;

    const { data: urlData } = supabase.storage
      .from("Uploads")
      .getPublicUrl(`User/${fileName}`);

    avatarUrl = urlData.publicUrl;
  }

  // Atualiza os dados do usuário incluindo a URL da imagem
  const { error: updateError } = await supabase.auth.updateUser({
    data: {
      full_name: formData.get("full_name"),
      username: formData.get("username"),
      phone: formData.get("phone"),
      avatar_url: avatarUrl || undefined,
    },
  });

  if (updateError) throw updateError;

  revalidatePath(pathname);

  return encodedRedirect(
    "success",
    pathname,
    "Dados atualizados com sucesso"
  );
}
