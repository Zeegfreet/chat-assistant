import { Worker } from "bullmq";
import { redisConnection } from "@db/messaging";
import { IMessageJobData } from "@domain/index";

export const chatwootResponse = new Worker("chatwoot-response", async (job) => {
    console.log("Escutando evento, ", job.data);

    const jobData: IMessageJobData = job.data;

    console.log("Response to chatwoot Data: ", jobData);
    
}, { 
    connection: redisConnection, 
    maxStartedAttempts: 5,
});
