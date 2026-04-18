import type { ScheduleOverrideDto } from "../services/venues/dtos/scheduleOverrideDto.ts";

class ScheduleOverride implements Omit<ScheduleOverrideDto, 'start' | 'end'> {
    open!: boolean;
    start: Date;
    end: Date;

    constructor(props: ScheduleOverrideDto) {
        Object.assign(this, props);
        this.start = new Date(props.start);
        this.end = new Date(props.end);
    }

    isNow() {
        return this.open && this.start < new Date() && this.end > new Date();
    }

}

export { ScheduleOverride };
