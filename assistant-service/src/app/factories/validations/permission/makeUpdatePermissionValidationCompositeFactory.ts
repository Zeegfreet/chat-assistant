import { ValidationComposite, ZodSchemaValidator } from "@presentation/validation";
import { singleIdSchema } from "@presentation/validation/schemas/singleIdSchema";
import { updatePermissionSchema } from "@presentation/validation/schemas/updatePermissionSchema";

export const makeUpdatePermissionValidationCompositeFacotry = () => {
    const bodyValidator = new ZodSchemaValidator(updatePermissionSchema, "body");
    const paramsValidator = new ZodSchemaValidator(singleIdSchema, "params");
    
    return new ValidationComposite([
        paramsValidator,
        bodyValidator,
    ]);
};