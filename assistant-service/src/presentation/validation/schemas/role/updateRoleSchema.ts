import { addRoleSchema } from "./addRoleSchema";

export const updateRoleSchema = addRoleSchema
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
        message: "No data received in request, body is required."
    });