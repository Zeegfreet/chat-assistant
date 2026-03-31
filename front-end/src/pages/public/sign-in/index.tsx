import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SignInForm } from "@/forms/public/sign-in-form"
import { AuthLayout } from "@/layouts/authLayout"
import { useTranslation } from "react-i18next"
import { Link } from "react-router"


export const SignInPage = () => {
    const { t } = useTranslation();
    return (
        <AuthLayout>
            <div className="h-full flex flex-col justify-center items-center" >
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle className="text-center">{t("signin.title")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <SignInForm />
                    </CardContent>
                    <CardFooter>
                        <Button  variant="link" className="w-full"><Link to="/signup">{t("signin.signup")}</Link></Button>
                    </CardFooter>
                </Card>
            </div>
        </AuthLayout>
    )
}