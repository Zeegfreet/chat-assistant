import { MainHeader } from "@/apps/main/MainHeader"
import type { PropsWithChildren } from "react"

export const MainAppLayout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="flex-1 flex flex-col">
                <MainHeader />
            <div className="flex-1">
               {children}
            </div>
        </div>
    )
}