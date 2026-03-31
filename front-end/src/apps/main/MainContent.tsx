import { MainAppLayout } from "@/layouts/mainAppLayout"
import { MainAppRoutes } from "@/routes/MainAppRoutes"


export const MainContent: React.FC = () => {
    return (
        <MainAppLayout>
            <MainAppRoutes />
        </MainAppLayout>
    )
}