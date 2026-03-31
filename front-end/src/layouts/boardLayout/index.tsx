import { cn } from "@/lib/utils"
import type { ComponentProps } from "react"

export const BoardLayout: React.FC<ComponentProps<"div">> = ({
    className,
    ...other
}) => {

    return (
        <div
            className="flex-1 p-5 md:p-10"
        >
            <div
                className={cn(className,
                    "border border-accent-foreground rounded-md p-5 md:p-10 bg-secondary"
                )}
                {...other}
            />
        </div>
    )
}