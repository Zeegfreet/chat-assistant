import { makeAppLoggerFactory } from "@app/factories/helpers/makeAppLoggerFactory";
import { makeFindAiAgentBySlugRepositoryFactory } from "@app/factories/repositories/aiagents/makeFindAiAgentBySlugRepositoryFactory";
import { makeProcessSendChatwootMessageFactory } from "@app/factories/useCases/chatwoot/makeProcessSendChatwootMessageFactory";
import { redisConnection } from "@db/messaging";
import { IMessageJobData } from "@domain/index";
import { Worker } from "bullmq";

export const agentMessageChatwootResponseWorker = new Worker("agent-message-chatwoot-response", async (job) => {
    const jobData: IMessageJobData = job.data;

    console.log("Processando job de resposta do Chatwoot para agente:", jobData);
    
    const findAgentBySlug = makeFindAiAgentBySlugRepositoryFactory();
    const processSendChatwootMessage = makeProcessSendChatwootMessageFactory();
    const logger = makeAppLoggerFactory();

    const agent = await findAgentBySlug.findBySlug(jobData.slug);

    const signeds = agent.signeds!;

    await Promise.all(
        signeds.map(async (signed) => {
            try {
                await processSendChatwootMessage.send({
                    baseUrl: signed.url,
                    headers: signed.headers,
                    message: jobData.text,
                    accountId: jobData.accountId,
                    conversationId: jobData.conversationId,
                });
                
            } catch (error) {
                logger.log({
                    message: error.message,
                    type: "error"
                });
                throw error;
            }
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