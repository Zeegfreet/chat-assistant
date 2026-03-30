import { ValidationComposite, ZodSchemaValidator } from "@presentation/validation";
import { updateAiAgentSchema } from "@presentation/validation/schemas/aiagents/updateAiAgentSchema";
import { singleIdSchema } from "@presentation/validation/schemas/singleIdSchema";

export const makeUpdateAiAgentValidationCompositeFactory = () => {
    const paramValidation = new ZodSchemaValidator(singleIdSchema, "params"); 
    const bodyValidation = new ZodSchemaValidator(updateAiAgentSchema, "body");
    return new ValidationComposite([
        paramValidation,
        bodyValidation
    ]);
};