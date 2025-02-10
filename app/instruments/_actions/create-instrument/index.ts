"use server";

import { createClient } from "@/utils/supabase/server";
import { CreateInstrumentSchema } from "./schema";
import { revalidatePath } from "next/cache";

export const createInstrument = async (formData: FormData): Promise<void> => {
  const supabase = await createClient();

  // Garantir que os valores não sejam nulos
  const name = formData.get("name")?.toString().trim();
  const strings = Number(formData.get("strings"));

  const { success } = CreateInstrumentSchema.safeParse({
    name,
    strings,
  });

  if (!success) {
    throw new Error("Dados inválidos.");
  }
  const { error } = await supabase
    .from("instruments")

    .insert({ name, strings });

  revalidatePath("/instruments");
  if (error) {
    throw new Error(error.message);
  }
};
