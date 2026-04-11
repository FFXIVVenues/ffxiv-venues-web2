const DEFAULTS = {
    theme: 'system',
    view: 'compact',
    sidebar: true,
    drawerSide: 'right',
};

class SettingsService {
    constructor() {
        let data = localStorage.getItem("aether-venues-settings");
        this._settings = data ? JSON.parse(data) : {};
        this._observers = {};
    }

    getSetting(settingId) {
        const value = this._settings[settingId];
        return value !== undefined ? value : DEFAULTS[settingId];
    }

    setSetting(settingId, value) {
        this._settings[settingId] = value;
        localStorage.setItem("aether-venues-settings", JSON.stringify(this._settings));
        this._observers[settingId]?.forEach(o => o());
    }

    observe(settingId, observer) {
        if (!this._observers[settingId])
            this._observers[settingId] = [];
        this._observers[settingId].push(observer);
        return () => this._observers[settingId] =
            this._observers[settingId].filter(o => o !== observer);
    }
}

export const settingsService = new SettingsService();
