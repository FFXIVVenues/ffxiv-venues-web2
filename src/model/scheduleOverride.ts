import type { ScheduleOverrideDto } from "../services/venues/dtos/scheduleOverrideDto";

class ScheduleOverride implements Omit<ScheduleOverrideDto, 'start' | 'end'> {
    open!: boolean;
    start: Date;
    end: Date;

    constructor(props: ScheduleOverrideDto) {
        Object.assign(this, props);
        this.start = new Date(props.start);
        this.end = new Date(props.end);
    }

}

export { ScheduleOverride };
