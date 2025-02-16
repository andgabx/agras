import { z } from "zod";

export const CreateAreaSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    community_id: z.number().int("ID da comunidade deve ser um número inteiro"),
    description: z.string().optional(),
    created_at: z.string().optional(),
});

export type CreateAreaInput = z.infer<typeof CreateAreaSchema>;