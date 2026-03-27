import { Decrypter } from "@data/protocols/decrypter";
import jwt, { TokenExpiredError } from "jsonwebtoken";

export class JwtAssimetricDecrypterAdapter implements Decrypter {
    private readonly publicKey: string;
    constructor(publicKey: string){
        this.publicKey = publicKey;
    }
    async decrypt(payload: Decrypter.Params): Promise<Decrypter.Result> {
        try {
            const dto = jwt.verify(
                payload,
                this.publicKey,
                {
                    algorithms: ["RS256"]
                }
            ) as any;
            return {
                success: true,
                resources: dto
            };
        } catch (error) {
            if(error instanceof TokenExpiredError){
                return {
                    success: false,
                    kind: "EXPIRED"
                };
            }
            return {
                success: false,
                kind: "INVALID"
            };
        }
    }
}