import { Page404 } from "@/pages/404"
import { AgentsPage } from "@/pages/private/agents-page"
import { CredentialsPage } from "@/pages/private/credentials-page"
import { MainPage } from "@/pages/private/main-page"
import { ProfilePage } from "@/pages/private/profile-page"
import { Route, Routes } from "react-router"


export const MainAppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/credentials" element={<CredentialsPage />} />
            <Route path="/agents" element={<AgentsPage />} />
            <Route path="*" element={<Page404 />} />
        </Routes>
    )
}