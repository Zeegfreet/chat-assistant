import { ValidationComposite, ZodSchemaValidator } from "@presentation/validation";
import { addRoleSchema } from "@presentation/validation/schemas/role/addRoleSchema";

export const makeAddRoleValidationCompositeFactory = () => {
    const bodyValidator = new ZodSchemaValidator(addRoleSchema);
    return new ValidationComposite([
        bodyValidator
    ]);
};