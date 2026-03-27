import { ValidationComposite, ZodSchemaValidator } from "@presentation/validation";
import { updateRoleSchema } from "@presentation/validation/schemas/role/updateRoleSchema";
import { singleIdSchema } from "@presentation/validation/schemas/singleIdSchema";

export const makeUpdateRoleValidationCompositeFacotry = () => {
    const idValidator = new ZodSchemaValidator(singleIdSchema, "params");
    const bodyValidator = new ZodSchemaValidator(updateRoleSchema, "body");
    return new ValidationComposite([
        idValidator,
        bodyValidator
    ]);
};