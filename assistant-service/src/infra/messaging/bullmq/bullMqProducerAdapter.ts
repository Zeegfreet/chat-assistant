import { Queue } from "bullmq";
import { redisConnection } from "./config/redisConnection";
import { IMessageQueue } from "@domain/index";

export class BullMqProducerAdapter implements IMessageQueue {
    private queues: Map<string, Queue> = new Map();

    async add(queueName: string, data: any): Promise<IMessageQueue.Result> {
        const queue = this.getOrCreateQueue(queueName);
    
        const job = await queue.add("process-job", data, {
            attempts: 3,
            backoff: { type: "exponential", delay: 1000 },
            removeOnComplete: true
        });

        return {
            jobId: job.id
        };
    }

    private getOrCreateQueue(name: string): Queue {
        if (!this.queues.has(name)) {
            this.queues.set(name, new Queue(name, { connection: redisConnection }));
        }
        return this.queues.get(name)!;
    }
}