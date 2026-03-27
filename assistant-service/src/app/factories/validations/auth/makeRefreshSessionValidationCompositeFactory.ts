import { ValidationComposite, ZodSchemaValidator } from "@presentation/validation";
import { refreshSessionSchema } from "@presentation/validation/schemas/auth/refreshSessionSchema";

export const makeRefreshSessionValidationCompositeFactory = () => {
    const bodyValidator = new ZodSchemaValidator(refreshSessionSchema);
    return new ValidationComposite([
        bodyValidator
    ]);
};