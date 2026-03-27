import { JwtAssimetricDecrypterAdapter } from "@db/cryptography/jwtAssimetricDecrypterAdapter";
import { readFileSync } from "node:fs";
import path from "node:path";

export const jwtDecrypterAdapterFactory = () => {
    const keyPath = path.resolve(
        process.cwd(),
        process.env.JWT_PUBLIC_KEY_PATH!
    );
    const publicKey = readFileSync(keyPath, {
        encoding: "utf-8"
    });
    return new JwtAssimetricDecrypterAdapter(publicKey);
};