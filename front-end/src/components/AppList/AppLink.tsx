import type { ReactNode } from "react";
import { useNavigate } from "react-router";

export interface AppLinkProps {
    size?: "sm" | "md" | "lg",
    icon: ReactNode;
    name: string;
    link: string;
}

export const AppLink: React.FC<AppLinkProps> = ({
    size,
    icon,
    name,
    link
}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(link)
    }
    return (
        <div className="flex gap-2 flex-col justify-center items-center border border-muted-foreground rounded-sm p-2 w-30 h-20 cursor-pointer bg-card hover:bg-muted" onClick={handleClick}>
            <p className="font-black">{icon}</p>
            <p>{name}</p>
        </div>
    )
}