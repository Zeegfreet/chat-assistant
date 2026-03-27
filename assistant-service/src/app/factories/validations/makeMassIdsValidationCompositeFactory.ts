import { ValidationComposite, ZodSchemaValidator } from "@presentation/validation";
import { massIdsSchema } from "@presentation/validation/schemas/massIdSchema";

export const makeMassIdsValidationCompositeFactory = () =>{
    const massIdsValidation = new ZodSchemaValidator(massIdsSchema, "body");
    
    return new ValidationComposite([
        massIdsValidation
    ]);
};