import { BaseEntity } from "./BaseEntity";

export class SignedsModel extends BaseEntity {
    url: string;
    headers?: object;
}