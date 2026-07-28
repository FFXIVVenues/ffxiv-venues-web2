import {useLingui, Trans} from "@lingui/react/macro";
import {selectOrdinal} from "@lingui/core/macro";
import {dtf} from "@/lib/utils/dateFormat.ts";

export const EffectiveDate = ({ date }: { date: Date }) => {
    const { t, i18n } = useLingui();
    const ordinal = t`${selectOrdinal(date.getDate(), { one: "#st", two: "#nd", few: "#rd", other: "#th" })}`;
    const formatted = dtf(i18n.locale, "effective")
        .formatToParts(date)
        .map(p => (p.type === "day" ? ordinal : p.value))
        .join("");
    return <Trans>Effective {formatted}</Trans>;
};