import React, {type ReactElement} from "react";

type Props = {
    date: Date;
    format24?: boolean;
    open?: boolean;
}

export function TimeText({ date, format24 = false, open = false }: Props): ReactElement {
    if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
        return <></>
    }

    const minutes = date.getMinutes().toString().padStart(2, '0');

    let formatted: string;

    if (format24) {
        const hours = date.getHours().toString().padStart(2, '0');
        formatted = `${hours}:${minutes}`;
    }
    else{
        const hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
        formatted = `${hours}:${minutes}${date.getHours() > 12 ? "pm" : "am"}`;
    }

    return <>{open ? `Open until ${formatted}` : formatted}</>;
}