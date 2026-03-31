import { useTranslation } from "react-i18next"
import z from "zod"

const getZodLocale = (lang: string) => {
    if(lang === 'en'){
        return z.locales.en()
    }

    return z.locales.pt()
}

export const LocaleProvider: React.FC = () => {
    const { i18n } = useTranslation()

    z.config(getZodLocale(i18n.language))
    
    return null
}