import { LayoutGridIcon } from "lucide-react"
import { Button } from "../ui/button"
import { Link } from "react-router"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

export const AppSelector: React.FC = () => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant="outline"
                    size="icon-lg"
                >
                    <Link to="/">
                        <LayoutGridIcon className="size-6"/>
                    </Link>
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                Aplicativos
            </TooltipContent>
        </Tooltip>
    )
}