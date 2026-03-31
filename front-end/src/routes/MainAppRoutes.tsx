import { MainPage } from "@/pages/private/main-page"
import { ProfilePage } from "@/pages/private/profile-page"
import { Route, Routes } from "react-router"


export const MainAppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/profile" element={<ProfilePage />} />
        </Routes>
    )
}