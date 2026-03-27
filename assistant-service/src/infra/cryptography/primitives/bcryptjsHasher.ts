import { HashCompare } from "@data/protocols/hashCompare";
import { HashTransform } from "@data/protocols/hashTransform";
import { compare, genSalt, hash } from "bcryptjs";

export class BcryptjsHasher implements HashCompare, HashTransform {
    async hash(password: HashTransform.Params): Promise<HashTransform.Result> {
        const salt = await genSalt(3);
        return await hash(password, salt);
    }
    async compare(password: HashCompare.Password, hash: HashCompare.Hash): Promise<HashCompare.Result> {
        return await compare(password, hash);
    }

}