import { ValidationComposite, ZodSchemaValidator } from "@presentation/validation";
import { updateCredentialSchema } from "@presentation/validation/schemas/credentials/updateCredentialSchema";
import { singleIdSchema } from "@presentation/validation/schemas/singleIdSchema";

export const makeUpdateCredentialValidationCompositeFactory = () => {
    const paramValidation = new ZodSchemaValidator(singleIdSchema, "params"); 
    const bodyValidation = new ZodSchemaValidator(updateCredentialSchema, "body");
    return new ValidationComposite([
        paramValidation,
        bodyValidation
    ]);
};