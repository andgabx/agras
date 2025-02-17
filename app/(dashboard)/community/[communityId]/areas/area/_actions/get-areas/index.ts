"use server";

import { createClient } from "@/utils/supabase/server";

export type Area = {
    id: string;
    name: string;
    description: string;
    community_id: string;
};

export async function getAreas(communityId: number) {
    const supabase = await createClient();

    const { data: areas, error } = await supabase
        .from("areas")
        .select("*")
        .eq("community_id", communityId);

    if (error) {
        throw new Error("Erro ao buscar áreas");
    }

    return areas as Area[];
}
