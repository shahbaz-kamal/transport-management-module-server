import { Role } from "@prisma/client";
import z from "zod";

const createUserZodSchema = z.object({
  email: z.email({ error: "Email Must follow standard email foirmat" }),
  password: z.string({ error: "password is required and must be string" }),
  name: z
    .string({ error: "Name must be string" })
    .min(2, "Name Must be at least 2 CHaracters long")
    .max(50, "Name can not exceed 50 characters")
    .optional(),
  role: z.enum(Object.values(Role) as [string]).optional(),
  address: z.string({ error: "Address must be string" }).optional(),
});

export const UserValidation = { createUserZodSchema };
