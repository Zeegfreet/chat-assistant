import { chatwootPimpaoWorker } from "./chatwoot-pimpao-worker";

export const setupWorkers  = () => {
    console.log("--- 🚀 Inicializando Workers BullMQ ---");

    chatwootPimpaoWorker.on("completed", (job) => {
        console.log(`[Worker]: Job ${job.id} finalizado com sucesso` );
    });

    chatwootPimpaoWorker.on("failed", (job, err) => {
        console.log(`[Worker] job ${job.id} falhou: ${err.message}` );
    });
   
};
