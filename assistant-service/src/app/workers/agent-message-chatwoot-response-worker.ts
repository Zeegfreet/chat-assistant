import { makeFindAiAgentBySlugRepositoryFactory } from "@app/factories/repositories/aiagents/makeFindAiAgentBySlugRepositoryFactory";
import { makeProcessSendChatwootMessageFactory } from "@app/factories/useCases/chatwoot/makeProcessSendChatwootMessageFactory";
import { redisConnection } from "@db/messaging";
import { IMessageJobData } from "@domain/index";
import { Worker } from "bullmq";

export const agentMessageChatwootResponseWorker = new Worker("agent-message-chatwoot-response", async (job) => {
    const jobData: IMessageJobData = job.data;
    
    const findAgentBySlug = makeFindAiAgentBySlugRepositoryFactory();
    const processSendChatwootMessage = makeProcessSendChatwootMessageFactory();

    const agent = await findAgentBySlug.findBySlug(jobData.slug);

    const signeds = agent.signeds!;

    await Promise.all(
        signeds.map(async (signed) => {
            await processSendChatwootMessage.send({
                baseUrl: signed.url,
                headers: signed.headers,
                message: jobData.text,
                accountId: jobData.accountId,
                conversationId: jobData.conversationId,
            });
        })
    );

}, { 
    connection: redisConnection, 
    maxStartedAttempts: 2, 
    limiter: {
        max: 1,
        duration: 10000
    }
});