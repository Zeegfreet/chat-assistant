import { AppPagination, type AppPaginationModel } from "@/components/AppPagination"
import { PageLoader } from "@/components/PageLoader"
import { Button } from "@/components/ui/button"
import { DataTable, type DataTableProps } from "@/components/ui/data-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { useCrudContext } from "@/contexts/crud-context/crud-provider"
import { useDebounce } from "@/hooks/use-debounce"
import useAppDispatch from "@/hooks/useAppDispatch"
import { SearchLayout } from "@/layouts/searchLayout"
import type { IPathName, ISearchQuery } from "@/services/httpServices"
import { crudActions } from "@/store/crud/actions"
import { selectByCrudSearchIsLoading, selectByCrudSearchItems, selectByCrudSearchPagination } from "@/store/crud/selectors"
import { Edit, EllipsisVertical, PlusCircle, Search, TrashIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export interface CrudSearchModuleProps<T = any, K = any> {
    columns: DataTableProps<T, K>["columns"],
    pathName: IPathName
}


export const CrudSearchModule: React.FC<CrudSearchModuleProps> = ({
    columns,
    pathName
}) => {
    const [searchValue, setSearchValue] = useState<string>("")
    const dispatch = useAppDispatch();
    const data = useSelector(selectByCrudSearchItems);
    const pagination = useSelector(selectByCrudSearchPagination);
    const isLoading = useSelector(selectByCrudSearchIsLoading);
    const search = useDebounce(searchValue, 500);
    const { actions } = useCrudContext();

    const colunsWithModules: CrudSearchModuleProps["columns"] = columns.concat([
        {
            header: " ",
            cell: ({ row }) => <ActionsDropDown id={row.original.id} pathName={pathName} />
        }
    ])

    useEffect(() => {
        handleSearch({
            search,
            page: pagination.currentPage,
            limit: pagination.limit
        })
    }, [search])

    const handleSearch = (query: ISearchQuery) => {
        dispatch(crudActions.search(query, pathName))
    }

    const handleChangePagination = (pagination: AppPaginationModel) => {
        handleSearch({
            search,
            page: pagination.currentPage,
            limit: pagination.limit
        })
    }

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearchValue(value)
    }

    const handleCreate = () => {
        actions.panel.open("isCreatePanelOpen")
    }

    return (
        <PageLoader isLoading={isLoading}>
            <SearchLayout
                headerContent={
                    <div className="flex pb-3 pt-3">
                        <div className="grow">
                            <Button variant="outline" className=" rounded-full" onClick={handleCreate}><PlusCircle /></Button>
                        </div>
                        <div>
                            <InputGroup className="max-w-xs">
                                <InputGroupInput placeholder="Search..." onChange={onSearch} />
                                <InputGroupAddon>
                                    <Search />
                                </InputGroupAddon>
                            </InputGroup>
                        </div>
                    </div>
                }
            >
                <DataTable
                    columns={colunsWithModules}
                    data={data}

                />
                <div className="pb-2 pt-2">
                    <AppPagination
                        {...pagination}
                        onPaginationChange={handleChangePagination}
                    />
                </div>
            </SearchLayout>
        </PageLoader>
    )
}


export interface ActionsDropDownProps {
    id: number,
    pathName: IPathName
}

const ActionsDropDown: React.FC<ActionsDropDownProps> = ({
    id,
    pathName
}) => {
    const dispatch = useAppDispatch();
    const { actions } = useCrudContext();

    const handleDelete = () => {
        dispatch(crudActions.setCurrent(id, pathName, "delete"))
        actions.panel.open("isDeleteModalOpen")
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline"><EllipsisVertical /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={handleDelete}>
                        <TrashIcon />
                        Deletar
                    </DropdownMenuItem>

                </DropdownMenuGroup>
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Edit />
                        Atualizar
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}