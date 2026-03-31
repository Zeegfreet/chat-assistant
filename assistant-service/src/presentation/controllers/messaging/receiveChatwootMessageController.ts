import { IQueueReceivedMessage } from "@domain/useCases/messaging/iQueueReceivedMessage";
import { errorHandler, onSuccess, onSuccessNoBody } from "@presentation/httpResponse/httpResponse";
import { Controller } from "@presentation/protocols/controller";

export class ReceiveChatwootMessageController implements Controller {
    constructor(
        private readonly messager: IQueueReceivedMessage
    ){}
    async handle(req: Controller.Request): Promise<Controller.Response<any>> {
        try {
            const { slug } = req.params;
            const payload = {...req.body, slug };
            
            if(!payload.message_type || payload.message_type && payload.message_type != "incoming"){
                return onSuccessNoBody();
            }

            const response = await this.messager.queue(payload);

            return onSuccess(response);

        } catch (error) {
            return errorHandler(error);
        }
    }

}