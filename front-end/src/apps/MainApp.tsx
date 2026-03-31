import { PrivateRoutes } from "@/routes/PrivateRoutes"
import { PublicRoutes } from "@/routes/PublicRoutes"
import { selectBySessionLoggedState } from "@/store/session/selectors"
import { useSelector } from "react-redux"


export const MainApp = () => {
    const isLogged = useSelector(selectBySessionLoggedState)
    return isLogged ? <PrivateRoutes /> : <PublicRoutes />
}