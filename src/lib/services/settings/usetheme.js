import { settingsService } from "./settingsService";

const applyTheme = (theme) => {
    const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', isDark);

    const colorScheme =
        theme === 'light' ? 'light' :
            theme === 'dark'  ? 'dark'  :
                'light dark';
    document.documentElement.style.setProperty('color-scheme', colorScheme);
};

export const provideTheme = () => {
    applyTheme(settingsService.getSetting('theme'));

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () =>
        applyTheme(settingsService.getSetting('theme')));

    settingsService.observe('theme', () =>
        applyTheme(settingsService.getSetting('theme')));
};