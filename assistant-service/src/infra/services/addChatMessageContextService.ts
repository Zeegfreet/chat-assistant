import { TypeOrmAddMessageRepository } from "@db/db/repositories/messages/typeOrmAddMessageRepository";
import { IAddMessageWithCacheService, MemoryAddMessageRepository, MemoryVerifyIfMessagesExists } from "@domain/index";

export class AddChatMessageContextService implements IAddMessageWithCacheService {
    constructor(
        private readonly memoryVerifyIfMessagesExists: MemoryVerifyIfMessagesExists,
        private readonly memoryAddMessageRepository: MemoryAddMessageRepository,
        private readonly dbAddMessageRepository: TypeOrmAddMessageRepository
    ){}
    async add(params: IAddMessageWithCacheService.Params): Promise<IAddMessageWithCacheService.Result> {
        const message = await this.dbAddMessageRepository.add(params);

        const hasCache = await this.memoryVerifyIfMessagesExists.verify(params.accountId, params.conversationId);
        
        if(hasCache){
            await this.memoryAddMessageRepository.add(message, 15);
        }

        return message;
    }

}