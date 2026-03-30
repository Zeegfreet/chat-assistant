import { chatwootPimpaoWorker } from "./chatwoot-pimpao-worker";
import { chatwootResponse } from "./chatwoot-response";

export const setupWorkers  = () => {
    console.log("--- 🚀 Inicializando Workers BullMQ ---");

    chatwootPimpaoWorker.on("completed", (job) => {
        console.log(`[Worker]: Job ${job.id} finalizado com sucesso` );
    });

    chatwootPimpaoWorker.on("failed", (job, err) => {
        console.log(`[Worker] job ${job.id} falhou: ${err.message}` );
    });

    chatwootResponse.on("completed", (job) => {
        console.log(`[Worker]: Job ${job.id} finalizado com sucesso` );
    });

    chatwootResponse.on("failed", (job, err) => {
        console.log(`[Worker] job ${job.id} falhou: ${err.message}` );
    });
   
};
