"use client";

import {
    createContext,
    useContext,
    useState,
    useCallback,
    ReactNode,
} from "react";
import { translations, Language, Translations } from "./translations";

interface LanguageContextType {
    lang: Language;
    dir: "ltr" | "rtl";
    setLang: (lang: Language) => void;
    toggleLang: () => void;
    t: Translations;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [lang, setLangState] = useState<Language>("en");

    const setLang = useCallback((newLang: Language) => {
        setLangState(newLang);
        document.documentElement.lang = newLang;
        document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
    }, []);

    const toggleLang = useCallback(() => {
        const main = document.querySelector('main');
        if (main) {
            main.style.transition = 'opacity 0.3s ease';
            main.style.opacity = '0';
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
                setLang(lang === "en" ? "ar" : "en");
                requestAnimationFrame(() => {
                    main.style.opacity = '1';
                });
            }, 300);
        } else {
            setLang(lang === "en" ? "ar" : "en");
        }
    }, [lang, setLang]);

    const dir = lang === "ar" ? "rtl" : "ltr";
    const t = translations[lang];

    return (
        <LanguageContext.Provider value={{ lang, dir, setLang, toggleLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
