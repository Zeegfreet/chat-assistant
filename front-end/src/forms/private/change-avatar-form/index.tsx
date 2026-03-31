import { PageLoader } from "@/components/PageLoader"
import { Button } from "@/components/ui/button"
import { FileImageInput } from "@/components/ui/file-image"
import { SaveIcon } from "lucide-react"
import { useTranslation } from "react-i18next"



export const ChangeAvatarForm: React.FC = () => {
    const { t } = useTranslation("forms");
    return (
        <PageLoader>
            <form>
                <FileImageInput type="file" />
                <div className="p-2 flex justify-center items-center">
                    <Button 
                        size="lg" 
                        className="min-w-30"
                        type="submit"
                        variant="outline"
                    >
                        <SaveIcon /> {t("save")}
                    </Button>
                </div>
            </form>
        </PageLoader>
    )
}