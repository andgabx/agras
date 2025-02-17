import { z } from "zod";

export const CreateSeedbedSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    area_id: z.number().int("ID da área deve ser um número inteiro"),
    community_id: z.number().int("ID da comunidade deve ser um número inteiro"),
})

export type CreateSeedbedInput = z.infer<typeof CreateSeedbedSchema>;