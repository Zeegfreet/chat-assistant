import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import commonEn from "./en/common.json";
import commonPt from "./pt/common.json";
import formsEn from "./en/forms.json";
import formsPt from "./pt/forms.json";
import componentsEn from "./en/components.json";
import componentsPt from "./pt/components.json"



const resources = {
    en: {
        common: commonEn,
        forms: formsEn,
        components: componentsEn,
    },
    pt: {
        common: commonPt,
        forms: formsPt,
        components: componentsPt
    }
}

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: "pt",
        interpolation: {
            escapeValue: false
        },
        defaultNS: "common",
        detection: {
            order: ["localStorage", "cookie", "navigator"],
            caches: ["localStorage", "cookie"]
        }
    });

export default i18n;
