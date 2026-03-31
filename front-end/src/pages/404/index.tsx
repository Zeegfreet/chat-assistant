import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { MapPinOffIcon } from "lucide-react"
import { useTranslation } from "react-i18next"


export const Page404 = () => {
    const { t } = useTranslation()
    return (
        <Empty className="h-full flex flex-column items-center justify-center">
            <EmptyMedia variant="icon">
                <MapPinOffIcon className="size-20" />
            </EmptyMedia>
            <EmptyHeader>
                <EmptyTitle>{t("404.title")}</EmptyTitle>
            </EmptyHeader>
            <EmptyDescription>{t("404.description")}</EmptyDescription>
        </Empty>
    )
}