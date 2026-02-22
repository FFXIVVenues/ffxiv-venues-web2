import React, {type ReactElement} from "react";

export function TimeText({ date, format24} : {date: Date, format24: boolean}) : ReactElement {
    return <React.Fragment>
        { format24
          ? <React.Fragment>{date.getHours().toString().padStart(2, "0")}:{date.getMinutes().toString().padStart(2, "0")}</React.Fragment>
          : <React.Fragment>
              { (date.getHours() > 12 ? date.getHours() - 12 : date.getHours())}:{date.getMinutes().toString().padStart(2, "0") }
              { date.getHours() >= 12 ? "pm": "am" }
          </React.Fragment>
        }
    </React.Fragment>
}