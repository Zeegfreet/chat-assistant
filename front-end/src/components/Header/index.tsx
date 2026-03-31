import { cn } from "@/lib/utils"
import type { ComponentProps, ReactNode } from "react"
import { UserMenu } from "./UserMenu"
import { ToggleThemeDark } from "../ToggleThemeDark"
import { LanguageSelector } from "../LanguageSelector"
import { AppSelector } from "../AppSelector"

export interface HeaderProps extends ComponentProps<"header"> {
    righContent: ReactNode
}

export const Header: React.FC<HeaderProps> = ({ children, className, righContent }) => {
    return (
        <header
            className={cn("h-15 flex", className)}
        >
            <div
                className="grow flex items-center gap-2"
            >
                <AppSelector />
                {children}
            </div>
            <div className="flex items-center gap-2">
                {righContent}
                <LanguageSelector />
                <ToggleThemeDark />
                <UserMenu />
            </div>
        </header>
    )
}