import { HashCompare } from "@data/protocols/hashCompare";
import { ForbiddenError } from "@domain/errors/ForbbidenError";
import { SignInError } from "@domain/errors/SignInError";
import { AddSessionRepository, CreatePairTokens, FindUserByEmailRepository } from "@domain/index";
import { SignIn } from "@domain/useCases/auth/signIn";

export class DbSignIn implements SignIn {
    constructor(
        private readonly findUserByEmailRepository: FindUserByEmailRepository,
        private readonly addSessionRepository: AddSessionRepository,
        private readonly createPairTokens: CreatePairTokens,
        private readonly hashCompare: HashCompare,
   
    ){}
    async login(payload: SignIn.Params): Promise<SignIn.Result> {

        const user = await this.findUserByEmailRepository.findByEmail(payload.email);
        if (!user) throw new SignInError();

        const { isActive, isBlocked } = user;

        if(isBlocked) throw new ForbiddenError("Current user is blocked");

        const isPasswordValid = await this.hashCompare.compare(payload.password, user.password);
        if(!isPasswordValid) throw new SignInError();

        if(!isActive) throw new ForbiddenError("Current user is inactive");

        const session = await this.addSessionRepository.add({
            isActive: true,
            origin: "LOGIN",
            user: { id: user.id }
        });

        const sessionData = await this.createPairTokens.create(user.id, session.id);

        return {
            user: sessionData.user,
            accessToken: sessionData.accessToken,
            refreshToken: sessionData.refreshToken
        };

    }
    
}