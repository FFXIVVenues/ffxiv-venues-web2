import type {Day} from "@/lib/model/day.ts";
import {getCurrentLocalDay} from "@/lib/utils/getCurrentLocalDay.ts";

export function nextDate(day: Day): Date {
    const date = new Date();
    date.setDate(date.getDate() + (day - getCurrentLocalDay() + 7) % 7);
    return date;
}

export function upcomingDates(day: Day): Date[] {
    return [0, 1, 2].map(week => {
        const date = nextDate(day);
        date.setDate(date.getDate() + week * 7);
        return date;
    });
}

export function toCalendarDate(date: Date, timeZone?: string): string {
    return date.toLocaleDateString("en-CA", {timeZone});
}

function weeksBetween(from: string, to: string): number {
    return Math.round((Date.parse(to) - Date.parse(from)) / (1000 * 60 * 60 * 24 * 7));
}

export function nextOpeningDate(commencing: string, timeZone: string, day: Day, everyWeeks: number): string {
    const start = toCalendarDate(new Date(commencing), timeZone);
    return upcomingDates(day).map(date => toCalendarDate(date)).find(date => date >= start && weeksBetween(start, date) % everyWeeks === 0) ?? start;
}

function offsetOf(date: Date, timeZone: string): string {
    return new Intl.DateTimeFormat("en-US", {timeZone, timeZoneName: "longOffset"}).format(date).split("GMT")[1] || "+00:00";
}

export function midnightIn(calendarDate: string, timeZone: string): string {
    const utcMidnight = new Date(`${calendarDate}T00:00:00Z`);
    const roughMidnight = new Date(`${calendarDate}T00:00:00${offsetOf(utcMidnight, timeZone)}`);
    return new Date(`${calendarDate}T00:00:00${offsetOf(roughMidnight, timeZone)}`).toISOString();
}
