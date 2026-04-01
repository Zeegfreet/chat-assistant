import { useEffect, useState } from "react"
import { Field, FieldDescription, FieldLabel } from "../ui/field"
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "../ui/pagination"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useTranslation } from "react-i18next"

export interface AppPaginationModel {
    totalPages: number,
    currentPage: number,
    limit: number
}

export interface AppPaginationProps {
    totalPages: number,
    currentPage: number,
    limit: number,
    onPaginationChange?: (values: AppPaginationModel) => void
}

export const AppPagination: React.FC<AppPaginationProps> = (props) => {
    const { t } = useTranslation("components");
    const [paginationModel, setPaginationModel] = useState<AppPaginationModel>({
        totalPages: props.totalPages,
        currentPage: props.currentPage,
        limit: props.limit
    })

    useEffect(() => {
        setPaginationModel(state => ({
            ...state,
            totalPages: props.totalPages
        }))
    }, [props.totalPages])

    const sendCallBack = (values: AppPaginationModel) => {
        if (props.onPaginationChange) {
            props.onPaginationChange(values)
        }
    }

    const handleRowsPerPageChange = (value: string) => {
        setPaginationModel(state => ({ ...state, limit: Number(value) }))
        sendCallBack({ ...paginationModel, limit: Number(value) })
    }

    const onPageChange = (value: number) => {
        const nextValue = paginationModel.currentPage + value

        if (nextValue <= paginationModel.totalPages) {
            setPaginationModel(state => ({
                ...state,
                currentPage: nextValue
            }))
            sendCallBack({
                ...paginationModel,
                currentPage: nextValue
            })
        }
    }

    return (
        <div className="flex items-center justify-between gap-4">
            <Field orientation="horizontal" className="w-fit">
                <FieldLabel>{t("pagination.rows per page")}</FieldLabel>
                <Select onValueChange={handleRowsPerPageChange} value={String(paginationModel.limit)}>
                    <SelectTrigger className="w-20">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent align="start">
                        <SelectGroup defaultValue={String(props.limit)}>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="15">15</SelectItem>
                            <SelectItem value="25">25</SelectItem>
                            <SelectItem value="40">40</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <FieldDescription>{t("pagination.page from pages", {
                    totalPages: paginationModel.totalPages,
                    currentPage: paginationModel.currentPage
                })}</FieldDescription>
            </Field>
            <Pagination className="mx-0 w-auto">
                <PaginationContent >
                    <PaginationItem >
                        <PaginationPrevious
                            onClick={() => paginationModel.currentPage > 1 ? onPageChange(-1) : null}
                            isActive={paginationModel.currentPage > 1}
                            text={t("pagination.previous")}
                            className="cursor-pointer"
                        />
                    </PaginationItem>
                    <PaginationItem value={1}>
                        <PaginationNext
                            onClick={() => paginationModel.currentPage < paginationModel.totalPages ? onPageChange(1) : null}
                            isActive={paginationModel.currentPage < paginationModel.totalPages}
                            text={t("pagination.next")}
                            className="cursor-pointer"
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}