import { FindHistoryMessageByIdentifiersRepository, IGetChatContextService, MemoryFindHistoryMessagesRepository, MemoryPopulateMessagesRepository, MemoryVerifyIfMessagesExists } from "@domain/index";

export class GetChatContextService implements IGetChatContextService {
    constructor(
        private readonly memoryVerifyIfMessagesExists: MemoryVerifyIfMessagesExists,
        private readonly memoryFindHistoryMessagesRepository: MemoryFindHistoryMessagesRepository,
        private readonly memoryPopulateMessageRepository: MemoryPopulateMessagesRepository,
        private readonly dbFindHistoryMessagesRepository: FindHistoryMessageByIdentifiersRepository,
    ){}
    async getContext(accountId: string, conversationId: string): Promise<IGetChatContextService.Result[]> {
        const exists = await this.memoryVerifyIfMessagesExists.verify(accountId, conversationId);

        if(exists){
            return this.memoryFindHistoryMessagesRepository.find(accountId, conversationId);
        }
        
        const dbHistory = await this.dbFindHistoryMessagesRepository.findByIdentifiers({
            accountId,
            conversationId
        }, 15);

        const history = dbHistory.reverse();

        if (history.length > 0){
            await this.memoryPopulateMessageRepository.populate(accountId, conversationId, history);
        }

        return history;
    }

}