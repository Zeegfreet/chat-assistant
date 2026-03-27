import { ValidationError } from "@presentation/errors";
import { HttpRequest } from "@presentation/protocols/http";
import { Validation } from "@presentation/protocols/validation";
import { ZodType } from "zod";

export class ZodSchemaValidator implements Validation {
    private readonly schema: ZodType;
    private readonly field: keyof HttpRequest;
    constructor(schema: ZodType, field: keyof HttpRequest = "body"){
        this.schema = schema;
        this.field = field;
    }
    async validate(httpRequest: HttpRequest): Promise<Error | void> {
        const input = httpRequest[this.field];
        const validator = this.schema.safeParse(input);
        if (!validator.success){
            const errorMessage = validator.error.issues
                .map(issue => `${issue.path.join(".")}: ${issue.message}`)
                .join("; ");
            return new ValidationError(errorMessage);
        }
    }
}