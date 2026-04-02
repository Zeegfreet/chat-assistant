import { CrudContextProvider } from "@/contexts/crud-context/crud-provider"
import { CrudSearchModule, type CrudSearchModuleProps } from "../crud/search-module"
import { useLayoutEffect } from "react"
import useAppDispatch from "@/hooks/useAppDispatch"
import { crudActions } from "@/store/crud/actions"
import { AdvancedCrudLayout } from "@/layouts/advancedCrudLayout"

export interface AdvancedCrudModuleProps {
    searchConfig: CrudSearchModuleProps,
    createForm?: React.ReactNode,
    updateForm?: React.ReactNode,
    deleteForm?: React.ReactNode,
    readContent?: React.ReactNode,
    title: string
}

export const AdvancedCrudModule: React.FC<AdvancedCrudModuleProps> = ({
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
            <AdvancedCrudLayout
                title={title}
                createModalContent={createForm}
                updateModalContent={updateForm}
                deleteModalContent={deleteForm}

            >
                <CrudSearchModule
                    {...searchConfig}
                />
            </AdvancedCrudLayout>
        </CrudContextProvider>
    )
}