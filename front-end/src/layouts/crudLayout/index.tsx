import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useCrudContext } from "@/contexts/crud-context/crud-provider"
import { selectByCrudCreateIsSuccess } from "@/store/crud/selectors"
import { useEffect, type PropsWithChildren } from "react"
import { useSelector } from "react-redux"

export interface CrudLayoutProps extends PropsWithChildren {
    title: string,
    createModalContent?: React.ReactNode,
    updateModalContent?: React.ReactNode,
    deleteModalContent?: React.ReactNode
}

export const CrudLayout: React.FC<CrudLayoutProps> = ({
    children,
    title,
    createModalContent,
    updateModalContent,
    deleteModalContent
}) => {
    const { state, actions } = useCrudContext();
    const isCreateSuccess = useSelector(selectByCrudCreateIsSuccess);

    useEffect(() => {
        if (isCreateSuccess) {
            actions.panel.close("isCreatePanelOpen")
        }
    }, [isCreateSuccess])


    return (
        <div>
            {children}
            {createModalContent ? <CrudModal isOpen={state.isCreatePanelOpen} onClose={() => actions.panel.close("isCreatePanelOpen")} title={title}>{createModalContent}</CrudModal> : null}
            {updateModalContent ? <CrudModal isOpen={state.isUpdatePanelOpen} onClose={() => actions.panel.close("isUpdatePanelOpen")} title={title}>{updateModalContent}</CrudModal> : null}
            {deleteModalContent ? <CrudModal isOpen={state.isDeleteModalOpen} onClose={() => actions.panel.close("isDeleteModalOpen")} title={title}>{deleteModalContent}</CrudModal> : null}
        </div>
    )
}

export interface CrudModalProps extends PropsWithChildren {
    isOpen: boolean,
    onClose: () => void,
    title: string,
}

export const CrudModal: React.FC<CrudModalProps> = ({
    title,
    isOpen,
    onClose,
    children
}) => {
    const handleOpenChange = (open: boolean) => {
        if (!open) onClose()
    }
    return (
        <Dialog
            open={isOpen}
            onOpenChange={handleOpenChange}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {title}
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription>

                </DialogDescription>
                {children}
            </DialogContent>
        </Dialog>
    )
}