import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SignUpForm } from "@/forms/public/sign-up-form"
import { AuthLayout } from "@/layouts/authLayout"
import { useTranslation } from "react-i18next"
import { Link } from "react-router"


export const SignUpPage = () => {
    const { t } = useTranslation();
    return (
        <AuthLayout>
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle className="text-center">{t("signup.title")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <SignUpForm />
                    </CardContent>
                    <CardFooter>
                        <Button  variant="link" className="w-full"><Link to="/">{t("signup.signin")}</Link></Button>
                    </CardFooter>
                </Card>
        </AuthLayout>
    )
}