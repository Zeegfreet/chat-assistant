import { MainContent } from "@/apps/main/MainContent"
import { Logout } from "@/components/Logout"
import { Route, Routes } from "react-router"


export const PrivateRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="signout" element={<Logout />} />
            <Route path="/*" element={<MainContent />} />
        </Routes>
    )
}