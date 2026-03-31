import { useSelector } from "react-redux"
import { Button } from "../ui/button"
import { selectThemeByApp } from "@/store/app/selectors"
import { Moon, Sun } from "lucide-react";
import useAppDispatch from "@/hooks/useAppDispatch";
import { appActions } from "@/store/app/actions";
import { Tooltip, TooltipContent } from "../ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { useTranslation } from "react-i18next";

export const ToggleThemeDark: React.FC = () => {
    const theme = useSelector(selectThemeByApp);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    const toggleTheme = () => {
        dispatch(appActions.toggleTheme())
    }
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    size="icon"
                    className="rounded-full"
                    onClick={toggleTheme}
                    variant="outline"
                >
                    {
                        theme === "dark" ?
                        <Sun /> : <Moon />
                    }
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                {theme === "light" ? t("themes.dark") : t("themes.light")}
            </TooltipContent>
        </Tooltip>
        
    )
}