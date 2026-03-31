import { useTranslation } from "react-i18next"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"


export const LanguageSelector = () => {
    const { t, i18n } = useTranslation()

    const onChangeLanguage = (value: string) => {
        i18n.changeLanguage(value)
    }
    

    return (
        <Select 
            onValueChange={onChangeLanguage}
            defaultValue={i18n.language}
        >
            <SelectTrigger>
                <SelectValue 
                />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{t("language")}</SelectLabel>
                    <SelectItem value="pt">🇧🇷 {t("languages.pt")}</SelectItem>
                    <SelectItem value="en">🇺🇸 {t("languages.en")}</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}