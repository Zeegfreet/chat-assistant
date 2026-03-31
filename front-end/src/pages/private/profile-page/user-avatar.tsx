import { usePrivateImage } from "@/hooks/use-private-image"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { Skeleton } from "../../../components/ui/skeleton"
import { Button } from "../../../components/ui/button"
import { ImageUp, Trash2Icon } from "lucide-react"
import Typography from "@/components/Typography"
import { useTranslation } from "react-i18next"
import { abreviate } from "@/utils/abreviate"
import { stringToColor } from "@/utils/stringToColoer"
import { filesServices } from "@/services/filesServices"
import { useState } from "react"
import { PageLoader } from "@/components/PageLoader"
import { Dialog, DialogContent, DialogDescription, DialogTrigger } from "@/components/ui/dialog"
import { DialogTitle } from "@radix-ui/react-dialog"
import { ChangeAvatarForm } from "@/forms/private/change-avatar-form"


export interface InputAvatarProps {
    userId: number,
    userName: string
}

export const UserAvatar: React.FC<InputAvatarProps> = ({
    userId,
    userName
}) => {
    const {
        isLoading: isAvatarLoading,
        src,
        reload
    } = usePrivateImage("/private/avatar" + "/" + userId);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { t } = useTranslation();
    const initials = abreviate(userName);
    const color = stringToColor(userName);
    
    const onRemoveAvatar = async () => {
        setIsLoading(true)
        const response = await filesServices.deleteFile("/private/avatar")
        .finally(() => {
            setIsLoading(false)
        })
        if(response.success){
            reload()
        }
    }

    return (
        <PageLoader
            isLoading={isLoading}
        >
            <div className="flex w-full flex-wrap">
                <div className="flex justify-center items-center p-5">
                    
                    {
                        isAvatarLoading ? <Skeleton 
                            className="h-25 w-25 rounded-full bg-gray-400"
                        /> :
                        <Avatar
                            className="h-25 w-25"
                        >
                            <AvatarImage src={src} />
                            <AvatarFallback style={{ backgroundColor: color }} >{initials}</AvatarFallback>
                        </Avatar>
                    }
                </div>
                <div className="flex-1 grid grid-rows-2 justify-center items-center bg-dark auto-cols-fr">
                    <div className="flex justify-center">
                        <Typography.H1>{userName}</Typography.H1>
                    </div>
                    <div className="flex justify-evenly flex-wrap gap-5">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button
                                    variant="outline"
                                >
                                    <ImageUp />
                                    {t("profile.upload avatar")}
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogTitle>New Avatar</DialogTitle>
                                <DialogDescription asChild>
                                    <ChangeAvatarForm />
                                </DialogDescription>
                            </DialogContent>
                        </Dialog>
                        <Button
                            variant="outline"
                            color="red"
                            onClick={onRemoveAvatar}
                        >
                            <Trash2Icon />
                            {t("profile.remove avatar")}
                        </Button>
                    </div>
                </div>
            </div>
        </PageLoader>
    )
}