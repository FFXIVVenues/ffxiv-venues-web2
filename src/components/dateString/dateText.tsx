import React, {type ReactElement} from "react";
import {nth} from "@/utils/nth.ts";
import {daysOfWeek} from "@/utils/daysOfWeek.ts";
import {monthsOfYear} from "@/utils/monthsOfYear.ts";

const today = new Date();
const dayOfWeek = today.getDay();

export function DateText({ date }: { date: Date }) : ReactElement {
    const inputDay = date.getDay();
    const inputDate = date.getDate();
    const inputMonth = date.getMonth();
    const daysUntil = (date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
    return <React.Fragment>
        {dayOfWeek === inputDay && daysUntil < 1 ? "Today" : daysOfWeek[inputDay]}
        {daysUntil > 21 && monthsOfYear[inputMonth]}
        {daysUntil > 7 && inputDate}{daysUntil > 7 && nth(inputDate)}
    </React.Fragment>
}
