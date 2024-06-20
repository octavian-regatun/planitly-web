import { z } from "zod";

const publicUserSchema = z.object({
  id: z.number(),
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  picture: z.string(),
});

export type PublicUser = z.infer<typeof publicUserSchema>;
