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
  creator_name: z.string().min(1, "Nome é obrigatório"),
  members: z
    .array(
      z.object({
        id: z.string().uuid("ID do membro inválido"),
        name: z.string().min(1, "Nome do membro é obrigatório"),
        email: z.string().email("Email do membro inválido"),
      })
    )
    .min(1, "Deve haver pelo menos um membro"),
  cover: z.string().optional(),
});

export type CreateCommunityInput = z.infer<typeof CreateCommunitySchema>;
