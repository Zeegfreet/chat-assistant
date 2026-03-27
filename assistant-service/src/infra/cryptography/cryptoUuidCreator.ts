import { UuidCreator } from "@data/protocols/uuidCreator";

export class CryptoUuidCreator implements UuidCreator {
    create(): string {
        return crypto.randomUUID();
    }

}