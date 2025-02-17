"use server"

import { createClient} from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { CreateSeedbedSchema } from "./schema";

export const createSeedbed = async (formData: FormData): Promise<void> => {
    const supabase = await createClient();

    const name = formData.get("name")?.toString().trim();
    const areaIdStr = formData.get("area_id")?.toString().trim(); 
    const communityIdStr = formData.get("community_id")?.toString().trim();
    const community_id = communityIdStr ? parseInt(communityIdStr, 10) : NaN;
    const area_id = areaIdStr ? parseInt(areaIdStr, 10) : NaN;

    const { success } = CreateSeedbedSchema.safeParse({
        name,
        area_id,
        community_id,
    });

    if (!success) {
        throw new Error("Dados inválidos.");
    }

    const { data: existingSeedbed, error: searchError } = await supabase
        .from("seedbeds")
        .select("name")
        .ilike("name", name || "")
        .maybeSingle();

    if (searchError) {
        throw new Error("Erro ao verificar o nome do canteiro.");
    }

    if (existingSeedbed) {
        throw new Error(
            `Já existe um canteiro chamado "${existingSeedbed.name}". Por favor, escolha outro nome.`
        );
    }

    const { error: insertError } = await supabase.from("seedbeds").insert({
        name,
        area_id,
        community_id,
    })

    if (insertError) {

        throw new Error("Erro ao criar o canteiro.");
    }

    revalidatePath(`/community/${community_id}/areas/area/${area_id}/seedbeds`);
}