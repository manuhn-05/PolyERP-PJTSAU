import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enCommon from "@/locales/en/common.json";
import hiCommon from "@/locales/hi/common.json";

i18n
  .use(LanguageDetector) // detects browser language
  .use(initReactI18next) // passes i18n to react-i18next
  .init({
    fallbackLng: "en", // default language
    debug: process.env.NODE_ENV === "development",
    interpolation: {
      escapeValue: false, // react already escapes
    },
    resources: {
      en: { common: enCommon,},
      hi: { common: hiCommon,},
    },
  });

export default i18n;
