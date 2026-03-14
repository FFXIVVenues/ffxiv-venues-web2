import React, {memo, type ReactElement} from "react";

type Props = {
    time: Date;
    format24?: boolean;
}

export const TimeText = memo(({ time, format24 = false}: Props) : ReactElement  => {
    return <React.Fragment>
        { format24
            ? <React.Fragment>{time.getHours().toString().padStart(2, "0")}:{time.getMinutes().toString().padStart(2, "0")}</React.Fragment>
            : <React.Fragment>
                { (time.getHours() > 12 ? time.getHours() - 12 : time.getHours())}:{time.getMinutes().toString().padStart(2, "0") }
                { time.getHours() >= 12 ? "pm": "am" }
            </React.Fragment>
        }
    </React.Fragment>
})