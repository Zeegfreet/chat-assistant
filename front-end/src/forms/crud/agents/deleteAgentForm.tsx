import { PageLoader } from "@/components/PageLoader";
import Typoraphy from "@/components/Typography"
import { Button } from "@/components/ui/button";
import { useCrudContext } from "@/contexts/crud-context/crud-provider";
import useAppDispatch from "@/hooks/useAppDispatch";
import { crudActions } from "@/store/crud/actions";
import { selectByCrudCreateIsLoading, selectByCrudDeleteCurrentItem, selectByCrudDeleteIsSuccess } from "@/store/crud/selectors";
import { useEffect } from "react";
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux";
import { toast } from "sonner";


export const DeleteAgentForm: React.FC = () => {
    const { t } = useTranslation("forms");
    const selectedItem = useSelector(selectByCrudDeleteCurrentItem);
    const isLoading = useSelector(selectByCrudCreateIsLoading);
    const isSuccess = useSelector(selectByCrudDeleteIsSuccess);
    const dispatch = useAppDispatch();
    const { actions } = useCrudContext();

    const handleCancel = () => {
        actions.panel.close("isDeleteModalOpen")
    }

    const handleConfirm = () => {
        dispatch(crudActions.delete(selectedItem["id"], "agents"))
    }

    useEffect(() => {
        if (isSuccess) {
            toast.message("Successful deleted")
            actions.panel.close("isDeleteModalOpen")
        }
        return () => {
            dispatch(crudActions.resetOneModule("delete"))
        }
    }, [isSuccess])


    return (
        <PageLoader
            isLoading={isLoading}
        >
            <div>
                <Typoraphy>{t("agents.messages.delete", { name: selectedItem ? selectedItem["name"] : null })}</Typoraphy>
                <div className="flex p-2 justify-end gap-3">
                    <Button
                        className="w-30"
                        variant="destructive"
                        onClick={handleConfirm}
                    >
                        {t("yes")}
                    </Button>
                    <Button
                        className="w-30"
                        variant="outline"
                        onClick={handleCancel}
                    >
                        {t("no")}
                    </Button>
                </div>
            </div>
        </PageLoader>
    )
}