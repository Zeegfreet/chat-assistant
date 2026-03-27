import { HashCompare } from "@data/protocols/hashCompare";
import { HashTransform } from "@data/protocols/hashTransform";

export class PasswordHasher implements HashCompare, HashTransform {
    constructor(
        private readonly hasher: HashCompare & HashTransform
    ){}
    async hash(password: HashTransform.Params): Promise<HashTransform.Result> {
        return await this.hasher.hash(password);
    }
    async compare(password: HashCompare.Password, hash: HashCompare.Hash): Promise<HashCompare.Result> {
        return await this.hasher.compare(password, hash);
    }

}