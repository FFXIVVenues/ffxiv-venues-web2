import {memo, type ReactElement} from "react";
import {useLingui} from "@lingui/react";
import {dtf} from "@/lib/utils/dateFormat.ts";

type Props = {
    time: Date;
    format24?: boolean;
}

export const TimeText = memo(({ time, format24 = false }: Props): ReactElement => {
    const { i18n } = useLingui();
    const formatted = dtf(i18n.locale, format24 ? "time24" : "time12").format(time);
    return <span>{formatted}</span>;
})