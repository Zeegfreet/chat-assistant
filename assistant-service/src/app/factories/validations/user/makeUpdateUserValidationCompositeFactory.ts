import { ZodSchemaValidator } from "@presentation/validation";
import { updateUserSchema } from "@presentation/validation/schemas/user/updateUserSchema";
import { singleIdSchema } from "@src/presentation/validation/schemas/singleIdSchema";
import { ValidationComposite } from "@src/presentation/validation/validationComposite";

export const makeUpdateUserValidationCompositeFactory = () => {
    const paramValidation = new ZodSchemaValidator(singleIdSchema, "params");
    const bodyValidation = new ZodSchemaValidator(updateUserSchema, "body");
    return new ValidationComposite([
        paramValidation,
        bodyValidation,
    ]);
};