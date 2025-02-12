import { z } from "zod";

export const CreateInstrumentSchema = z.object({
  name: z.string().min(1, { message: "O nome do instrumento é obrigatório" }),
  strings: z.number().min(1, { message: "A quantidade de cordas deve ser maior que 0" }),
});
