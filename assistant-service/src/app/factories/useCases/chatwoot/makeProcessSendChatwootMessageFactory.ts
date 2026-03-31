import { ProcessSendChatwootMessage } from "@data/useCases/chatwoot/processSendChatwootMessage";
import { HttpSendChatwootMessage } from "@db/http/chatwoot/HttpSendChatwootMessageRepository";

export const makeProcessSendChatwootMessageFactory = () => {
    const sendChatwooMessageRepository = new HttpSendChatwootMessage();
    return new ProcessSendChatwootMessage(
        sendChatwooMessageRepository
    );
};