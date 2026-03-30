import { ValidationComposite, ZodSchemaValidator } from "@presentation/validation";
import { addPromptSchema } from "@presentation/validation/schemas/prompts/addPromptSchema";

export const makeAddPromptValidationCompositeFactory = () => {
    const schemaValidation = new ZodSchemaValidator(addPromptSchema);
    return new ValidationComposite([schemaValidation]);
};