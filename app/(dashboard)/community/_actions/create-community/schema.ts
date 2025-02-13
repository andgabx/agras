import { z } from "zod";

export const CreateCommunitySchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  admin_id: z.string().uuid("ID do administrador inválido"),
  description: z
    .string()
    .max(60, "Descrição máxima de 60 caracteres")
    .optional(),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z.string().min(1, "Estado é obrigatório"),
});

export type CreateCommunityInput = z.infer<typeof CreateCommunitySchema>;
