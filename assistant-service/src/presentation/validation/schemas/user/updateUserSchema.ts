import { addUserSchema } from "./addUserSchema";

export const updateUserSchema = addUserSchema
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
        message: "No data received in request, body is required."
    });