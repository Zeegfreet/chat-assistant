import { Page404Redirect } from "@/pages/404Redirect";
import { SignInPage } from "@/pages/public/sign-in";
import { SignUpPage } from "@/pages/public/sign-up";
import { Route, Routes } from "react-router";

export const PublicRoutes: React.FC = () => (
    <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="*" element={<Page404Redirect />} />
    </Routes>
)