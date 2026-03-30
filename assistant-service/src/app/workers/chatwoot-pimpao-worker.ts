import { Worker } from "bullmq";
import { redisConnection } from "@db/messaging";
import { makeProcessChatwootMessageFactory } from "@app/factories/useCases/messaging/makeProcessChatwootMessageFactory";
import { makeQueueChatwootResponseMessageFactory } from "@app/factories/useCases/messaging/makeQueueChatwootResponseMessageFactory";
import { IMessageJobData } from "@domain/index";

export const chatwootPimpaoWorker = new Worker("chatwoot-pimpao", async (job) => {
    console.log("Escutando evento, ", job.data);

    const jobData: IMessageJobData = job.data;

    const processer = makeProcessChatwootMessageFactory();
    const responseQuequer = makeQueueChatwootResponseMessageFactory();

    const response = await processer.proccess(jobData);

    if(response.action){
        responseQuequer.queue({
            accountId: jobData.accountId,
            conversationId: jobData.conversationId,
            contactId: jobData.contactId,
            role: "model",
            message_type: "text",
            text: response.message,
            message_content: {}
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
