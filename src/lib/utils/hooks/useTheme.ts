import { useSetting } from "@/lib/services/settings/useSetting";
import { useEffect } from "react";

export const useTheme = () => {
    const theme = useSetting('theme');
    useEffect(() => {
        const colorScheme =
            theme === 'light' ? 'light' :
                theme === 'dark'  ? 'dark'  :
                    'light dark';
        if (!document.startViewTransition) {
            document.documentElement.style.setProperty('color-scheme', colorScheme);
            return;
        }

        document.startViewTransition(() => {
            document.documentElement.style.setProperty('color-scheme', colorScheme);
        });
    }, [theme]);
};

export const ThemeProvider = () => {
    useTheme();
    return null;
};