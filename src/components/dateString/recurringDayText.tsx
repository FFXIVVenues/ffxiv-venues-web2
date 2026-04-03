import days from "@/lib/model/consts/days.json";
import {nth} from "@/lib/utils";
import {Interval} from "@/lib/model/interval.ts";
import {IntervalType} from "@/lib/model/intervalType.ts";
import {memo} from "react";

export const RecurringDayText = memo(({ date, interval }: {date: Date, interval: Interval}) => {

  const day = (date.getDay() + 6) % 7;
  const dayNoun = days[day];

  if (interval.intervalType === IntervalType.EveryXWeeks) {
    if (interval.intervalArgument === 1) {
      return <>Weekly on {dayNoun}s</>
    } else if (interval.intervalArgument === 2) {
      return <>Biweekly on {dayNoun}s</>
    } else {
      return <>{interval.intervalArgument} weekly on {dayNoun}s</>}
  }

  else if (interval.intervalType === IntervalType.EveryXthDayOfTheMonth && interval.intervalArgument > 0) {
    return <>{interval.intervalArgument}{nth(interval.intervalArgument)} {dayNoun} of the month</>
  }

  else if (interval.intervalType === IntervalType.EveryXthDayOfTheMonth && interval.intervalArgument === -1) {
    return <>Last {dayNoun} of the month</>
  }

  else if (interval.intervalType === IntervalType.EveryXthDayOfTheMonth && interval.intervalArgument < -1) {
    return <>{Math.abs(interval.intervalArgument)}{nth(Math.abs(interval.intervalArgument))} last {dayNoun} of the month</>
  }

})
