import {memo} from "react";
import {useLingui} from "@lingui/react/macro";
import {selectOrdinal, msg} from "@lingui/core/macro";
import {dtf} from "@/lib/utils/dateFormat.ts";
import {Interval} from "@/lib/model/interval.ts";
import {IntervalType} from "@/lib/model/intervalType.ts";

export const RecurringDayText = memo(({ date, interval }: { date: Date, interval: Interval }) => {
  const { t, i18n } = useLingui();
  const day = dtf(i18n.locale, "weekdayLong").format(date);
  const arg = interval.intervalArgument;
  const ordinal = msg({
    message: `${selectOrdinal(Math.abs(arg), { one: "#st", two: "#nd", few: "#rd", other: "#th" })}`,
    comment: "Date endings e.g 1st, 2nd, 3rd... 20th etc",
  });

  if (interval.intervalType === IntervalType.EveryXWeeks) {
    if (arg === 1) return <>{t`Weekly on ${day}s`}</>;
    if (arg === 2) return <>{t`Biweekly on ${day}s`}</>;
    return <>{t`${arg} weekly on ${day}s`}</>;
  }

  if (interval.intervalType === IntervalType.EveryXthDayOfTheMonth) {
    if (arg > 0)
      return <>{t`${t(ordinal)} ${day} of the month`}</>;
    if (arg === -1)
      return <>{t`Last ${day} of the month`}</>;
    return <>{t`${t(ordinal)} last ${day} of the month`}</>;
  }

  return null;
})