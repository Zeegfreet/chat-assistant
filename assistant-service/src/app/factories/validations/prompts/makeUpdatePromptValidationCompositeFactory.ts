import { ValidationComposite, ZodSchemaValidator } from "@presentation/validation";
import { updatePromptSchema } from "@presentation/validation/schemas/prompts/updatePromptSchema";
import { singleIdSchema } from "@presentation/validation/schemas/singleIdSchema";

export const makeUpdatePromptValidationCompositeFactory = () => {
    const paramValidation = new ZodSchemaValidator(singleIdSchema, "params"); 
    const bodyValidation = new ZodSchemaValidator(updatePromptSchema, "body");
    return new ValidationComposite([
        paramValidation,
        bodyValidation
    ]);
};