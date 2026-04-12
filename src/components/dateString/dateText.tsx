import React, {memo, type ReactElement} from "react";
import {nth} from "@/lib/utils/nth.ts";
import {daysOfWeek} from "@/lib/utils/daysOfWeek.ts";
import {monthsOfYear} from "@/lib/utils/monthsOfYear.ts";

const today = new Date();
const dayOfWeek = today.getDay();

export const DateText = memo(({ date, short = false }: { date: Date, short?: boolean }) : ReactElement =>
{
    const inputDay = date.getDay();
    const inputDate = date.getDate();
    const inputMonth = date.getMonth();
    const daysUntil = (date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

    if (short) return <React.Fragment>
        {dayOfWeek === inputDay && daysUntil < 1 ? "Today" : daysOfWeek[inputDay]!.slice(0, 3)}
        {daysUntil > 21 && ` ${monthsOfYear[inputMonth]!.slice(0, 3)}`}
        {` ${inputDate}${nth(inputDate)}`}
    </React.Fragment>

    return <React.Fragment>
        {dayOfWeek === inputDay && daysUntil < 1 ? "Today " : `${daysOfWeek[inputDay]} `}
        {daysUntil > 21 && `${monthsOfYear[inputMonth]} `}
        {daysUntil > 7 && ` ${inputDate}${daysUntil > 7 && nth(inputDate)} `}
    </React.Fragment>
})
