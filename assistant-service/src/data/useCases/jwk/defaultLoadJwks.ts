import { JWKGenerator } from "@data/protocols/jwkGenerator";
import { LoadJwks } from "@domain/useCases/jwk/loadJWKs";

export class DefaultLoadJwks implements LoadJwks {
    constructor(
    private readonly jwkGenerator: JWKGenerator
    ) {}

    async load(): Promise<LoadJwks.Result> {
        const jwk = await this.jwkGenerator.generate();

        return {
            keys: [jwk]
        };
    }
}