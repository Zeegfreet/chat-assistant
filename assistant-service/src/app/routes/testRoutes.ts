import { TypeOrmAddMessageRepository } from "@db/db/repositories/messages/typeOrmAddMessageRepository";
import { TypeOrmFindHistoryMessagesByIdentifierRepository } from "@db/db/repositories/messages/typeOrmFindHistoryMessagesByIdentifierRepository";
import { FileSystemFindPromptByNameRepository } from "@db/fileSystem/repositories/fileSystemFindPromptByNameRepository";
import { RedisFindHistoryMessagesRepository } from "@db/redis/repository/messages/redisFindHistoryMessagesRepository";
import { RedisPopulateMessagesRepository } from "@db/redis/repository/messages/redisPopulateMessagesRepository";
import { Router } from "express";

const router = Router();

router
    .get("/how", (req, res) => res.status(200).send({ message: "Hellow World" }) )
    .get("/test/messages", async (req, res) => {
        const message = req.body;
        const addMessageRepository = new TypeOrmAddMessageRepository();
        const findMessageRepository = new TypeOrmFindHistoryMessagesByIdentifierRepository();
        const redisPopulate = new RedisPopulateMessagesRepository();
        const redisFindHistory = new RedisFindHistoryMessagesRepository();

        await addMessageRepository.add(message);

        const history = await findMessageRepository.findByIdentifiers({
            accountId: message.accountId,
            conversationId: message.conversationId
        });

        await redisPopulate.populate(message.accountId, message.conversationId, history);

        const redisHistory = await redisFindHistory.find(message.accountId, message.conversationId);

        res.status(200).send(redisHistory);

    })
    .get("/test/:name", async (req, res) => {
        const { name } = req.params;

        const findPrompt = new FileSystemFindPromptByNameRepository();

        const findedPrompt = await findPrompt.findByName(name);

        res.status(200).send(findedPrompt);
    
    });

export default router;