import z from "zod";
import { associationSchema } from "../associationSchema";

export const addRoleSchema = z.object({
    role: z.string().min(5).max(50),
    description: z.string().min(5).max(250),
    isActive: z.boolean().optional(),
    isDefault: z.boolean().optional(),
    permissions: z.array(associationSchema).optional()
});