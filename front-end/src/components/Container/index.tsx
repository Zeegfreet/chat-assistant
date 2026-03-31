import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export interface ContainerProps extends ComponentProps<"div"> {

}

export const Container: React.FC<ContainerProps> = ({ className, ...other }) => (
    <div 
        {...other}
        className={cn(className, "container m-auto")}
    />
)