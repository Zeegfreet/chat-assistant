import { addCredentialSchema } from "./addCredentialSchema";

export const updateCredentialSchema = addCredentialSchema.partial().refine(
    (data) => Object.keys(data).length > 0 && Object.values(data).some(v => v !== undefined),
    {
        message: "1 attribute is required to this request",
    }
);