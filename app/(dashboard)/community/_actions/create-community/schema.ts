import { z } from "zod";

export const CreateCommunitySchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  admin_id: z.string().uuid("ID do administrador inválido"),
  description: z
    .string()
    .max(60, "Descrição máxima de 60 caracteres")
    .optional(),
});

export type CreateCommunityInput = z.infer<typeof CreateCommunitySchema>;
