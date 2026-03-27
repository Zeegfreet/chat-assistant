import { ZodSchemaValidator } from "@presentation/validation";
import { singleIdSchema } from "@src/presentation/validation/schemas/singleIdSchema";
import { ValidationComposite } from "@src/presentation/validation/validationComposite";

export const singleIdValidationCompositeFactory = () => {
    const schemaValidation = new ZodSchemaValidator(singleIdSchema, "params");
    return new ValidationComposite([schemaValidation]);
};