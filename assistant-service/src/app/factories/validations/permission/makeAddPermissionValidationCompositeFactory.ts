import { ValidationComposite, ZodSchemaValidator } from "@presentation/validation";
import { addPermissionSchema } from "@presentation/validation/schemas/addPermissionSchema";

export const makeAddPermissionValidationCompositeFactory = () => {
    
    const zodSchemaValidator = new ZodSchemaValidator(addPermissionSchema);
    return new ValidationComposite([
        zodSchemaValidator
    ]);
};