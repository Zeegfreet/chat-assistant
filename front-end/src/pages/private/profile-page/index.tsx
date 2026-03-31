import { Container } from "@/components/Container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserAvatar } from "@/pages/private/profile-page/user-avatar"
import { ChangeEmailForm } from "@/forms/private/change-email-form"
import { ChangePasswordForm } from "@/forms/private/change-password-form"
import { ProfileForm } from "@/forms/private/profile-form"
import { selectByLoggedUserId, selectByLoggedUserName } from "@/store/session/selectors"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"


export const ProfilePage: React.FC = () => {
    const userName = useSelector(selectByLoggedUserName);
    const userId = useSelector(selectByLoggedUserId);
    const { t } = useTranslation();
    return (
        <Container className="h-full flex flex-col items-center p-2">
            <Card
                className="w-150 max-md:w-full"
            >
                <CardHeader>
                    <CardTitle className="flex flex-col justify-center items-center gap-2">
                        <UserAvatar
                            userId={userId || 0}
                            userName={userName || ""}
                        />
                    </CardTitle>

                </CardHeader>
                <Separator className="m-2" />
                <CardContent>
                    <Tabs defaultValue="profile">
                        <TabsList variant="line">
                            <TabsTrigger value="profile">{t("profile.profile")}</TabsTrigger>
                            <TabsTrigger value="password">{t("profile.change password")}</TabsTrigger>
                            <TabsTrigger value="email">{t("profile.change email")}</TabsTrigger>
                        </TabsList>
                        <TabsContent value="profile">
                            <ProfileForm />
                        </TabsContent>
                        <TabsContent value="password">
                            <ChangePasswordForm />
                        </TabsContent>
                        <TabsContent
                            value="email"
                        >
                            <ChangeEmailForm />
                        </TabsContent>

                    </Tabs>
                </CardContent>
            </Card>
        </Container>
    )
}