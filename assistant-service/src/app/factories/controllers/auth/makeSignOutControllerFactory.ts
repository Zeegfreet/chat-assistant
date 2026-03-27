import { DbSignOut } from "@data/useCases";
import { TypeOrmFindSessionByPkRepository, TypeOrmUpdateSessionRepository } from "@db/db/repositories";
import { RedisAddSessionToBlackList } from "@db/redis/repository/session/redisAddSessionToBlackList";
import { SignOutController } from "@presentation/controllers/auth/signOutController";

export const makeSignOutControllerFactory = () => {
    const updateSessionRepository = new TypeOrmUpdateSessionRepository();
    const findSessionByPkRepository = new TypeOrmFindSessionByPkRepository();
    const addSessionToBlackListRepository = new RedisAddSessionToBlackList();
    const dbSignOut = new DbSignOut(
        updateSessionRepository,
        findSessionByPkRepository,
        addSessionToBlackListRepository
    );

    return new SignOutController(
        dbSignOut
    );
};