import { Decrypter } from "@data/protocols/decrypter";
import jwt, { TokenExpiredError } from "jsonwebtoken";

export class JwtSimetricDecrypterAdapter implements Decrypter {

    async decrypt(payload: Decrypter.Params): Promise<Decrypter.Result> {
        try {
            const dto = jwt.verify(
                payload,
                process.env.JWT_REFRESH_KEY_PASSPHRASE,
                {
                    algorithms: ["HS256"]
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