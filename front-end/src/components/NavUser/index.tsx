import { ChevronsUpDown, LogOutIcon, UserIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "../ui/sidebar"
import { Link } from "react-router";
import { abreviate } from "@/utils/abreviate";
import { stringToColor } from "@/utils/stringToColoer";
import { usePrivateImage } from "@/hooks/use-private-image";
import { Skeleton } from "../ui/skeleton";

export interface NavUserProps {
    id: number | undefined;
    name: string;
    email: string;
}


export const NavUser: React.FC<NavUserProps> = ({ id, name, email }) => {
    const {isMobile} = useSidebar();
    
    const { src, isLoading } = usePrivateImage(`private/avatar/${id}`)
    
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton
                                size="lg"
                            >
                                {
                                    isLoading ? <Skeleton 
                                        className="h-8 w-8 rounded-lg"
                                    />
                                    : <Avatar
                                            className="h-8 w-8 rounded-lg"
                                        >
                                            <AvatarImage 
                                                src={src}
                            
                                            />
                                            <AvatarFallback style={{ backgroundColor: stringToColor(name) }}>{abreviate(name)}</AvatarFallback>
                        
                                        </Avatar>
                                }
                                
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">{name}</span>
                                    <span className="truncate text-xs">{email}</span>
                                </div>
                                <ChevronsUpDown className="ml-auto size-4"/>
                            </SidebarMenuButton>  
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            side={isMobile ? "bottom" : "right"}
                            align="end"
                        >
                            <DropdownMenuLabel className="p-0 font-normal">
                                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                    <Avatar className="h-8 w-8 rounded-lg">
                                    { isLoading ? <Skeleton /> : <AvatarImage src={src} />}
                                    <AvatarFallback className="rounded-lg" style={{ backgroundColor: stringToColor(name) }}>{abreviate(name)}</AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">{name}</span>
                                    <span className="truncate text-xs">{email}</span>
                                    </div>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <UserIcon /> Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild >
                                   <Link to="/signout"><LogOutIcon /> Logout</Link>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}