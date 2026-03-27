import { ValidationError } from "@domain/errors/ValidationError";
import { ListPermissionRepository, MassDeletePermission, MassDeletePermissionRepository } from "@domain/index";

export class DbMassDeletePermission implements MassDeletePermission{
    constructor(
        private readonly repository: MassDeletePermissionRepository,
        private readonly listRepository: ListPermissionRepository
    ){}
    async delete(ids: MassDeletePermission.Id[]): Promise<MassDeletePermission.Result[]> {
        if(!Array.isArray(ids)) throw new ValidationError("received ids is not an valid array.");
        const countOfDeletedItems = await this.repository.delete(ids);

        if(ids.length === countOfDeletedItems) return ids;

        const remanescentItems = await this.listRepository.list({
            filter: {
                id: {
                    $in: ids
                }
            }
        });

        const deletedItems = ids.filter(id => !remanescentItems.data.some(item => item.id === id));

        return deletedItems;

    }

}