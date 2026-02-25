export function getCurrentLocalDay(): number {
    const day = new Date().getDay() - 1;
    return day < 0 ? day + 7 : day;
}