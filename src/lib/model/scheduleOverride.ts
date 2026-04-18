import type { ScheduleOverrideDto } from "../services/venues/dtos/scheduleOverrideDto.ts";

class ScheduleOverride {
    open!: boolean;
    start: Date;
    end: Date;
    isNow: boolean;

    constructor(props: ScheduleOverrideDto) {
        this.open = props.open;
        this.start = new Date(props.start);
        this.end = new Date(props.end);
        this.isNow = props.isNow;
    }

}

export { ScheduleOverride };
