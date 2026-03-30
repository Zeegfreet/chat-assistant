import { ValidationComposite, ZodSchemaValidator } from "@presentation/validation";
import { addAiAgentSchema } from "@presentation/validation/schemas/aiagents/addAiAgentSchema";

export const makeAddAiAgentValidationCompositeFactory = () => {
    const schemaValidation = new ZodSchemaValidator(addAiAgentSchema);
    return new ValidationComposite([schemaValidation]);
};