import { IQueueReceivedMessage } from "@domain/useCases/messaging/iQueueReceivedMessage";
import { errorHandler, onSuccess, onSuccessNoBody } from "@presentation/httpResponse/httpResponse";
import { Controller } from "@presentation/protocols/controller";

export class QueueReceivedChatwootMessageController implements Controller {
    constructor(
        private readonly messager: IQueueReceivedMessage
    ){}
    async handle(req: Controller.Request): Promise<Controller.Response<any>> {
        try {
            const { slug } = req.params;
            const raw = {...req.body, slug };
            
            if(!raw.message_type || raw.message_type && raw.message_type != "incoming"){
                return onSuccessNoBody();
            }

            const payload : IQueueReceivedMessage.Params = {
                accountId: raw.account.id,
                conversationId: raw.conversation.id,
                contactId: raw.sender.id,
                role: "user",
                message_type: "incoming",
                text: raw.content,
                slug: slug,
                contact: {
                    name: raw.sender.name,
                    email: raw.sender.email,
                    phoneNumber: raw.sender.phone_number,
                },
                message_content: {}
            };

            const response = await this.messager.queue(payload);

            return onSuccess(response);

        } catch (error) {
            return errorHandler(error);
        }
    }

}