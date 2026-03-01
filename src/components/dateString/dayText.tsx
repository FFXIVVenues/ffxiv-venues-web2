const DAY_NAMES = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"] as const;

export function getDay(relativeIndex: number, now = new Date()) {
    const dayIndex = (now.getDay() + relativeIndex) % 7;
    const dayName = DAY_NAMES[dayIndex];

    if (relativeIndex === 0) return `Today (${dayName})`;
    if (relativeIndex === 1) return `Tomorrow (${dayName})`;
    return dayName;
}