import { z } from "zod";

export const CreateCommunitySchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  admin_id: z.string().uuid("ID do administrador inválido"),
});

export type CreateCommunityInput = z.infer<typeof CreateCommunitySchema>; 