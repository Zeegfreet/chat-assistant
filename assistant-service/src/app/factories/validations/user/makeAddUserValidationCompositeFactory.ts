import { ZodSchemaValidator } from "@presentation/validation";
import { addUserSchema } from "@presentation/validation/schemas/user/addUserSchema";
import { ValidationComposite } from "@src/presentation/validation/validationComposite";

export const makeAddUserValidationCompositeFactory = () =>{
    const zodSchemaValidation = new ZodSchemaValidator(addUserSchema, "body");
    return new ValidationComposite([zodSchemaValidation]);
};