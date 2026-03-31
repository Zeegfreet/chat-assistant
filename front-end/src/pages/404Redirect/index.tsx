import { useLayoutEffect } from "react";
import { useNavigate } from "react-router"

export const Page404Redirect: React.FC = () => {
    const navigate = useNavigate();
    useLayoutEffect(() => {
        navigate("/")
    })
    return (<></>)
}