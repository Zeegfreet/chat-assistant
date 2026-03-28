import { DbConnection } from "@db/db/config/dbConnection";
import { AddMessageRepository } from "@domain/index";
import { Messages } from "@src/entitys/messages.entity";

export class TypeOrmAddMessageRepository implements AddMessageRepository {
    private get permissionRepository() {
        return DbConnection.getInstance().getCollection(Messages);
    }
    async add(params: AddMessageRepository.Params): Promise<AddMessageRepository.Result> {
        const messageToSave = this.permissionRepository.create(params);
        const savedMessage = await this.permissionRepository.save(messageToSave);
        return savedMessage as any;
    }

}