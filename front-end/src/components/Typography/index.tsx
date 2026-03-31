import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";


export interface TypographyProps extends ComponentProps<"p">{

}

function Typoraphy({ className, ...other  }: TypographyProps){
    return (
        <p 
            {...other}
            className={cn(className)}
        />
    )
}

export interface TypographyH1Props extends ComponentProps<"h1">{

}

export const TypographyH1: React.FC<TypographyH1Props> = ({
    className,
    ...other
}) => {
    return (
        <h1
            {...other}
            className={cn(className)}
        />
    )
}

Typoraphy.H1 = TypographyH1;

export default Typoraphy;