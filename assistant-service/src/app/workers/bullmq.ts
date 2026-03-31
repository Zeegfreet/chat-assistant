import { agentMessageReceivedWorker } from "./agent-message-received-worker";
import { agentMessageResponseWorker } from "./agent-message-response-worker";

export const setupWorkers  = () => {
    console.log("--- 🚀 Inicializando Workers BullMQ ---");

    agentMessageReceivedWorker.on("completed", (job) => {
        console.log(`[Worker]: Job ${job.id} finalizado com sucesso` );
    });

    agentMessageReceivedWorker.on("failed", (job, err) => {
        console.log(`[Worker] job ${job.id} falhou: ${err.message}` );
    });

    agentMessageResponseWorker.on("completed", (job) => {
        console.log(`[Worker]: Job ${job.id} finalizado com sucesso` );
    });

    agentMessageResponseWorker.on("failed", (job, err) => {
        console.log(`[Worker] job ${job.id} falhou: ${err.message}` );
    });
   
};
