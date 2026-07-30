import {memo} from "react";
import {useLingui} from "@lingui/react/macro";
import {selectOrdinal} from "@lingui/core/macro";
import {dtf} from "@/lib/utils/dateFormat.ts";
import {Interval} from "@/lib/model/interval.ts";
import {IntervalType} from "@/lib/model/intervalType.ts";

export const RecurringDayText = memo(({ date, interval }: { date: Date, interval: Interval }) => {
  const { t, i18n } = useLingui();
  const day = dtf(i18n.locale, "weekdayLong").format(date);
  const arg = interval.intervalArgument;

  if (interval.intervalType === IntervalType.EveryXWeeks) {
    if (arg === 1) return <>{t`Weekly on ${day}s`}</>;
    if (arg === 2) return <>{t`Biweekly on ${day}s`}</>;
    return <>{t`${arg} weekly on ${day}s`}</>;
  }

  if (interval.intervalType === IntervalType.EveryXthDayOfTheMonth) {
    if (arg > 0)
      return <>{t`${selectOrdinal(arg, { one: "#st", two: "#nd", few: "#rd", other: "#th" })} ${day} of the month`}</>;
    if (arg === -1)
      return <>{t`Last ${day} of the month`}</>;
    return <>{t`${selectOrdinal(Math.abs(arg), { one: "#st", two: "#nd", few: "#rd", other: "#th" })} last ${day} of the month`}</>;
  }

  return null;
})