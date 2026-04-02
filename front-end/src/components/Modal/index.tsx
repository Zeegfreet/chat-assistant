import { cn } from "@/lib/utils"
import type { ComponentProps } from "react"
import { Button } from "../ui/button"
import { XIcon } from "lucide-react"
import { TypographyH1 } from "../Typography"

export interface ModalProps extends ComponentProps<"div"> {
    isOpen: boolean,
    onClose: () => void,
    title?: string
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title, ...other }) => {

    return (
        <div
            className="fixed flex flex-col justify-center inset-0 z-50 bg-black/25 left-0 p-10"
            hidden={!isOpen}
        >
            <div
                {...other}
                className={cn(
                    other.className,
                    " mt-10 w-full m-auto bg-accent rounded-2xl min-h-60 p-2 flex-1"
                )}

            >
                <div className="flex w-full">
                    <div className="grow p-2">
                        <TypographyH1 className=" font-semibold">{title}</TypographyH1>
                    </div>
                    <div>
                        <Button
                            variant="ghost"
                            className="rounded-full"
                            onClick={onClose}
                        >
                            <XIcon className="size-7" />
                        </Button>
                    </div>
                </div>
                {children}
            </div>
        </div>
    )
}