import useAppDispatch from "@/hooks/useAppDispatch"
import { sessionActions } from "@/store/session/actions";
import { selectBySessionIsSuccessState } from "@/store/session/selectors";
import { useEffect } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";


export const Logout: React.FC = () => {
    const dispatch = useAppDispatch();
    const isSuccess = useSelector(selectBySessionIsSuccessState);
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(sessionActions.signOut())
    },[dispatch])

    useEffect(() => {
        if(isSuccess === true) navigate("/")
        
    },[isSuccess])
    return null
}