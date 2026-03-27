import { VerifySessionIsInBlackList, VerifySessionIsInBlackListRepository } from "@domain/index";

export class DbmVerifySessionIsInBlackList implements VerifySessionIsInBlackList{
    constructor(
        private readonly verifySessionIsInBlackListRepository: VerifySessionIsInBlackListRepository
    ){}
    async verify(sessionId: VerifySessionIsInBlackList.SessionId): Promise<VerifySessionIsInBlackList.Result> {
        const check = await this.verifySessionIsInBlackListRepository.verify(sessionId);
        return check;
    }

}