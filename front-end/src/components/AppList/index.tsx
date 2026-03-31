import { BotIcon, LockIcon } from "lucide-react"
import { AppLink, type AppLinkProps } from "./AppLink"



const appLinks: AppLinkProps[] = [
    {
        name: "Credenciais",
        icon: <LockIcon />,
        link: "/credentials",
    },
    {
        name: "Agentes",
        icon: <BotIcon />,
        link: "/agents",
    },
]


export const AppList: React.FC = () => {

    return (
        <div className="flex-1 flex wrap gap-2">
            {appLinks.map((props, index) => <AppLink
                key={index}
                {...props}
            />)}
        </div>
    )
}