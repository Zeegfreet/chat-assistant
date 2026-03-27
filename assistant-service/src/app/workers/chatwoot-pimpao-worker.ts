import { Worker } from "bullmq";
import { redisConnection } from "@db/messaging";
import { makeProcessChatwootMessageFactory } from "@app/factories/useCases/messaging/makeProcessChatwootMessageFactory";

export const chatwootPimpaoWorker = new Worker("chatwoot-pimpao", async (job) => {
    console.log("Escutando evento, ", job.data);

    const processer = makeProcessChatwootMessageFactory();

    await processer.proccess(job.data);
}, { 
    connection: redisConnection, 
    maxStartedAttempts: 2, 
    limiter: {
        max: 1,
        duration: 10000
    }
});
