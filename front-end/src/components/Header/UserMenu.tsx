import { useSelector } from "react-redux"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { selectByLoggedUserEmail, selectByLoggedUserName } from "@/store/session/selectors"
import { abreviate } from "@/utils/abreviate"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { LogOutIcon, UserIcon } from "lucide-react"
import { stringToColor } from "@/utils/stringToColoer"
import { Link, useNavigate } from "react-router"
import { useTranslation } from "react-i18next"

export const UserMenu: React.FC = () => {
    const name = useSelector(selectByLoggedUserName);
    const email = useSelector(selectByLoggedUserEmail);
    const initials = abreviate(name || "");
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="secondary"
                    size="icon-lg"
                    className="rounded-full w-13 h-13"
                >
                    <Avatar
                        className="w-12 h-12"
                    >
                        {<AvatarImage />}
                        <AvatarFallback className="rounded-lg" style={{ backgroundColor: stringToColor(name || "") }}>{initials}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel className="p-0 font-normal cursor-default">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <Avatar className="h-8 w-8 rounded-full">
                            {<AvatarImage />}
                            <AvatarFallback className="rounded-lg" style={{ backgroundColor: stringToColor(name || "") }}>{initials}</AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-medium">{name}</span>
                            <span className="truncate text-xs">{email}</span>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem
                        onClick={() => navigate("/profile")}
                    >
                        <UserIcon />
                        {t("menus.profile.profile")}
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link
                            to="/signout"
                        >
                            <LogOutIcon />
                            {t("menus.profile.logout")}
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}