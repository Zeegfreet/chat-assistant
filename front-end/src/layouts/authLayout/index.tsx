import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { LanguageSelector } from "@/components/LanguageSelector"
import { StaticImage } from "@/components/StaticImage"

export const AuthLayout: React.FC<ComponentProps<"div">> = ({ children }) => {

    return (
        <>
            <div
                className="flex-1 flex" 
            >
                <div
                className="w-full md:w-150 p-5"
                >
                    <div className="w-full flex flex-col justify-center items-center p-5">
                        <LanguageSelector />
                    </div>
                    {children}
                </div>
                <div
                    className={cn("flex flex-1 max-[1024px]:hidden, justify-center, items-center")}
                >
                    <StaticImage 
                        src="public/auth_pages_side_content.jpg"
                    />
                </div>
            </div>
        </>
    )
}