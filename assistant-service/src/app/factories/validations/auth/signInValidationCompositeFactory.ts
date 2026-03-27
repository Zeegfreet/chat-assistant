import { ZodSchemaValidator } from "@presentation/validation";
import { signInSchema } from "@presentation/validation/schemas/signInSchema";
import { ValidationComposite } from "@src/presentation/validation/validationComposite";

export const signInValidationCompositeFactory = () =>{
    const zodSchemaValidation = new ZodSchemaValidator(signInSchema, "body");
    return new ValidationComposite([zodSchemaValidation]);
};