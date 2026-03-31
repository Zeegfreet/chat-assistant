import { Worker } from "bullmq";
import { redisConnection } from "@db/messaging";
import { makeProcessChatwootMessageFactory } from "@app/factories/useCases/messaging/makeProcessChatwootMessageFactory";
import { makeQueueChatwootResponseMessageFactory } from "@app/factories/useCases/messaging/makeQueueChatwootResponseMessageFactory";
import { IMessageJobData } from "@domain/index";

export const agentMessageReceivedWorker = new Worker("agent-message-received", async (job) => {
    
    const jobData: IMessageJobData = job.data;

    const processer = makeProcessChatwootMessageFactory();
    const responseQuequer = makeQueueChatwootResponseMessageFactory();

    const response = await processer.proccess(jobData);

    if(response.action){
        responseQuequer.queue({
            accountId: jobData.accountId,
            conversationId: jobData.conversationId,
            contactId: jobData.contactId,
            provider: "chatwoot",
            role: "model",
            message_type: "outgoing",
            text: response.message,
            slug: jobData.slug,
            message_content: {} as any
        });
    }
}, { 
    connection: redisConnection, 
    maxStartedAttempts: 2, 
    limiter: {
        max: 1,
        duration: 10000
    }
});
