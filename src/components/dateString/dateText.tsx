import {memo, type ReactElement} from "react";
import {useLingui} from "@lingui/react/macro";
import {selectOrdinal, msg} from "@lingui/core/macro";
import {dtf, type DtfKey} from "@/lib/utils/dateFormat.ts";

const today = new Date();
const dayOfWeek = today.getDay();

export const DateText = memo(({ date, short = false }: { date: Date, short?: boolean }): ReactElement => {
    const { t, i18n } = useLingui();
    const daysUntil = (date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
    const isToday = dayOfWeek === date.getDay() && daysUntil < 1;
    if (isToday) return <span>{t`Today`}</span>;

    const key: DtfKey =
        daysUntil > 7 ? (short ? "dateFarShort" : "dateFar")
                : (short ? "weekdayShort" : "weekdayLong");

    const ordinal = msg({
        message: `${selectOrdinal(date.getDate(), { one: "#st", two: "#nd", few: "#rd", other: "#th" })}`,
        comment: "Date endings e.g 1st, 2nd, 3rd... 20th etc",
    });
    const display = dtf(i18n.locale, key).formatToParts(date).map(part => (part.type === "day" ? t(ordinal) : part.value)).join("");

    return <span>{display}</span>;
});