import { ZodSchemaValidator } from "@presentation/validation";
import { signUpSchema } from "@presentation/validation/schemas/signUpSchema";
import { ValidationComposite } from "@src/presentation/validation/validationComposite";

export const signUpValidationCompositeFactory = () =>{
    const zodSchemaValidation = new ZodSchemaValidator(signUpSchema, "body");
    return new ValidationComposite([zodSchemaValidation]);
};