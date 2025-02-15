"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

const updateAccount = async (formData: FormData) => {
  const supabase = await createClient();
  const phone = formData.get("phone") as string;
  const fullName = formData.get("full_name") as string;


  const { error } = await supabase.auth.updateUser({
    data: {
      full_name: fullName,
      phone: phone,
    },
  });

  revalidatePath("/account");

  if (error) {
    return encodedRedirect(
      "error",
      "/account",
      "Falha na atualização dos dados"
    );
  }

  return encodedRedirect(
    "success",
    "/account",
    "Dados atualizados com sucesso"
  );
};

export default updateAccount;
