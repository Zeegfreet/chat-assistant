import { ValidationComposite, ZodSchemaValidator } from "@presentation/validation";
import { addCredentialSchema } from "@presentation/validation/schemas/credentials/addCredentialSchema";

export const makeAddCredentialValidationCompositeFactory = () => {
    const schemaValidation = new ZodSchemaValidator(addCredentialSchema);
    return new ValidationComposite([schemaValidation]);
};