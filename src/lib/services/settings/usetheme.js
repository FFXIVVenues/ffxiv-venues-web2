import { settingsService } from "./settingsService";

const applyTheme = (theme) => {
    const colorScheme =
        theme === 'light' ? 'light' :
            theme === 'dark'  ? 'dark'  :
                'light dark';
    document.documentElement.style.setProperty('color-scheme', colorScheme);
};

export const provideTheme = () => {
    applyTheme(settingsService.getSetting('theme'));
    settingsService.observe('theme', () =>
        applyTheme(settingsService.getSetting('theme')));
};