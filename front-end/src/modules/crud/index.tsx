import { CrudContextProvider } from "@/contexts/crud-context/crud-provider"
import { CrudLayout } from "@/layouts/crudLayout"
import { CrudSearchModule, type CrudSearchModuleProps } from "./search-module"
import { useLayoutEffect } from "react"
import useAppDispatch from "@/hooks/useAppDispatch"
import { crudActions } from "@/store/crud/actions"

export interface CrudModuleProps {
    searchConfig: CrudSearchModuleProps,
    createForm?: React.ReactNode,
    updateForm?: React.ReactNode,
    deleteForm?: React.ReactNode,
    readContent?: React.ReactNode,
    title: string
}

export const CrudModule: React.FC<CrudModuleProps> = ({
    searchConfig,
    title,
    createForm,
    updateForm,
    deleteForm,
    // readContent
}) => {
    const dispatch = useAppDispatch();

    useLayoutEffect(() => {
        return () => {
            dispatch(crudActions.reset())
        }
    })

    return (
        <CrudContextProvider>
            <CrudLayout
                title={title}
                createModalContent={createForm}
                updateModalContent={updateForm}
                deleteModalContent={deleteForm}

            >
                <CrudSearchModule
                    {...searchConfig}
                />
            </CrudLayout>
        </CrudContextProvider>
    )
}