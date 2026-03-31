import { Worker } from "bullmq";
import { redisConnection } from "@db/messaging";
import { IMessageJobData } from "@domain/index";

export const agentMessageResponseWorker = new Worker("agent-message-response", async (job) => {
    const jobData: IMessageJobData = job.data;

    console.log("Response to chatwoot Data: ", jobData);
    
}, { 
    connection: redisConnection, 
    maxStartedAttempts: 5,
});
