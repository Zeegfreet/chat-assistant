import { Worker } from "bullmq";
import { redisConnection } from "@db/messaging";
import { IMessageJobData } from "@domain/index";
import { makeQueueSendChatwootMessageFactory } from "@app/factories/useCases/chatwoot/makeQueueSendChatwootMessageFactory";

export const agentMessageResponseWorker = new Worker("agent-message-response", async (job) => {
    const jobData: IMessageJobData = job.data;
    const queueChatwootMessage = makeQueueSendChatwootMessageFactory();

    if(jobData.provider === "chatwoot") queueChatwootMessage.queue(job.data);
}, { 
    connection: redisConnection, 
    maxStartedAttempts: 5,
});
