"use server"

import { createClient } from "@/utils/supabase/server"

export type Seedbed = {
    id: number,
    area_id: number,
    community_id: number,
    name: string,
    created_at: string,
}

export async function getSeedbeds(areaId: number): Promise<Seedbed[]> {
    const supabase = await createClient();

    const { data: seedbeds, error } = await supabase
        .from("seedbeds")
        .select("*")
        .eq("area_id", areaId);

    if (error) {
        throw new Error("Erro ao buscar canteiros");
    }

    return seedbeds as Seedbed[];
}