import { Toaster } from "@/components/ui/sonner";
import { selectThemeByApp } from "@/store/app/selectors";
import { useEffect } from "react";
import { useSelector } from "react-redux";


export const AppProvider: React.FC = () => {
    const theme = useSelector(selectThemeByApp)
    const root = window.document.documentElement;

    useEffect(() => {
        root.classList.remove("light", "dark")
        root.classList.add(theme)

    }, [theme])

    return (
        <Toaster 
          position="top-right"
          closeButton={true}
        />
    )
}