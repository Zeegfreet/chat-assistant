import { NavUser } from "@/components/NavUser"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"
import { selectByLoggedUserEmail, selectByLoggedUserId, selectByLoggedUserName } from "@/store/session/selectors"
import { useSelector } from "react-redux"


export const AppSideBar: React.FC = () => {
    return (
        <Sidebar
            variant="sidebar"
            collapsible="icon"
        >
            <SidebarHeader>
                Header
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup />
                
            </SidebarContent>
            <MainSideBarFooter />
        </Sidebar>
    )
}

export const MainSideBarFooter: React.FC = () => {
    const userId = useSelector(selectByLoggedUserId);
    const name = useSelector(selectByLoggedUserName);
    const email = useSelector(selectByLoggedUserEmail);

    return (
        <SidebarFooter>
            
           <NavUser 
                id={userId}
                name={name || "Not Found"}
                email={email || "not-found@example.com"}
           />
           <SidebarRail />
        </SidebarFooter>
    )
}