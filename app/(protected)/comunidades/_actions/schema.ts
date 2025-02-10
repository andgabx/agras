import { z } from  "zod";

export const CommunitySchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1).max(255),
    description: z.string().min(1),
    created_at: z.coerce.date(),
    creator_id: z.string().uuid(),

    members: z.array(z.object({
        user_id: z.string().uuid()
    })).optional(),

    admins: z.array(z.object({
        user_id: z.string().uuid()
    })).optional(),

    seedbeds: z.string().uuid()
  });

  export const CreateCommunitySchema = CommunitySchema.omit({
    id: true,
    created_at: true,
    members: true, 
    admins: true,
    seedbeds: true
  });

export type Community = z.infer<typeof CommunitySchema>;
export type CreateCommunity = z.infer<typeof CreateCommunitySchema>;
