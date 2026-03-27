import { ValidationComposite, ZodSchemaValidator } from "@presentation/validation";
import { searchSchema } from "@presentation/validation/schemas/searchSchema";

export const searchParamsValidationCompositeFactory = () => {
    const zodSchemaValidator = new ZodSchemaValidator(searchSchema, "query");
    return new ValidationComposite([
        zodSchemaValidator
    ]);
};