import {useLingui} from "@lingui/react/macro";
import {selectOrdinal} from "@lingui/core/macro";
import {dtf, type DtfKey} from "@/lib/utils/dateFormat.ts";

export const FormattedDate = ({ date, format }: { date: Date, format: DtfKey }) => {
    const { t, i18n } = useLingui();
    const ordinal = t({
        message: `${selectOrdinal(date.getDate(), { one: "#st", two: "#nd", few: "#rd", other: "#th" })}`,
        comment: "Date endings e.g 1st, 2nd, 3rd... 20th etc",
    });
    const display = dtf(i18n.locale, format)
        .formatToParts(date)
        .map(p => (p.type === "day" ? ordinal : p.value))
        .join("");
    return <>{display}</>;
};