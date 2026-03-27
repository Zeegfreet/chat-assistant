import { BcryptjsHasher, PasswordHasher } from "@db/cryptography";

export const hashFactory = () => {
    const bcryptjsHasher = new BcryptjsHasher();
    const passwordHasher = new PasswordHasher(bcryptjsHasher);
    return passwordHasher;
};