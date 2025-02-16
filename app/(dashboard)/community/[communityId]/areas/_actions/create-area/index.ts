"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { CreateAreaSchema } from "./schema";

export const createArea = async (formData: FormData): Promise<void> => {
    const supabase = await createClient();

    const name = formData.get("name")?.toString().trim();
    const description = formData.get("description")?.toString().trim();
    const communityIdStr = formData.get("community_id")?.toString().trim();
    const community_id = communityIdStr ? parseInt(communityIdStr, 10) : NaN;
    
    const { success } = CreateAreaSchema.safeParse({
        name,
        community_id,
        description,
    });

    if (!success) {
        throw new Error("Dados inválidos.");
    }

    const { data: existingArea, error: searchError } = await supabase
        .from("areas")
        .select("name")
        .ilike("name", name || "")
        .maybeSingle();

    if (searchError) {
        throw new Error("Erro ao verificar o nome da área.");
    }

    if (existingArea) {
        throw new Error(
            `Já existe uma área chamada "${existingArea.name}". Por favor, escolha outro nome.`
        );
    }

    const { error: insertError } = await supabase.from("areas").insert({
        name,
        community_id,
        description,
    });

    if (insertError) {
        throw new Error("Erro ao criar a área.");
    }

    revalidatePath(`/community/${community_id}/areas`);
};

