import { settingsService } from "./settingsService.js";
import {useEffect, useState} from "react";

export const useSetting = (settingName) => {
    const listViewSetting = settingsService.getSetting(settingName);
    const [ settingValue, setSettingValue ] = useState(listViewSetting);
    useEffect(() => {
        return settingsService.observe(settingName, () =>
            setSettingValue(settingsService.getSetting(settingName)));
    }, []);
    return settingValue;
};