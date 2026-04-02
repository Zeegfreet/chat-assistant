import { Modal } from "@/components/Modal"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { useCrudContext } from "@/contexts/crud-context/crud-provider"
import { selectByCrudCreateIsSuccess } from "@/store/crud/selectors"
import { useEffect, type PropsWithChildren } from "react"
import { useSelector } from "react-redux"

export interface AdvancedCrudLayoutProps extends PropsWithChildren {
    title: string,
    createModalContent?: React.ReactNode,
    updateModalContent?: React.ReactNode,
    deleteModalContent?: React.ReactNode
}

export const AdvancedCrudLayout: React.FC<AdvancedCrudLayoutProps> = ({
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
            {createModalContent ? <CrudDrawer isOpen={state.isCreatePanelOpen} onClose={() => actions.panel.close("isCreatePanelOpen")} title={title}>{createModalContent}</CrudDrawer> : null}
            {updateModalContent ? <CrudDrawer isOpen={state.isUpdatePanelOpen} onClose={() => actions.panel.close("isUpdatePanelOpen")} title={title}>{updateModalContent}</CrudDrawer> : null}
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

export interface CrudDrawerProps extends PropsWithChildren {
    isOpen: boolean,
    onClose: () => void,
    title: string,
}

export const CrudDrawer: React.FC<CrudDrawerProps> = ({
    title,
    isOpen,
    onClose,
    children
}) => {
    const handleOpenChange = (open: boolean) => {
        if (!open) onClose()
    }

    return (
        <Drawer
            direction="bottom"
            open={isOpen}
            onOpenChange={handleOpenChange}

        >
            <DrawerContent
            >
                <DrawerHeader>
                    <DrawerTitle>{title}</DrawerTitle>
                </DrawerHeader>
                <DrawerDescription></DrawerDescription>
                {children}
            </DrawerContent>
        </Drawer>
    )
}


export interface CrudDrawerProps extends PropsWithChildren {
    isOpen: boolean,
    onClose: () => void,
    title: string,
}

export const CrudAdvancedModal: React.FC<CrudDrawerProps> = ({
    title,
    isOpen,
    onClose,
    children
}) => {

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
        >
            {children}
        </Modal>
    )
}