class SettingsService {
    constructor() {
        let data = localStorage.getItem("aether-venues-settings");
        this._settings = data ? JSON.parse(data) : {};
        this._observers = {};
    }

    getSetting(settingId) {
        return this._settings[settingId];
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
