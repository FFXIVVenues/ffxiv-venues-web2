import {useEffect, useState} from "react";
import {useLingui} from "@lingui/react/macro";
import {toast} from "sonner";
import type {VenueDto} from "@/lib/services/venues2/dtos/venueDto.ts";
import type {ScheduleOverrideDto} from "@/lib/services/venues2/dtos/scheduleOverrideDto.ts";
import {getVenue} from "@/lib/services/venues2/getVenue.ts";
import {updateVenue} from "@/lib/services/venues2/updateVenue.ts";
import {saveError} from "@/components/venueForm/saveError.ts";

export const useScheduleOverrides = (venueId: string) => {
    const {t} = useLingui();
    const [venue, setVenue] = useState<VenueDto | "loading" | "missing">("loading");
    const [overrides, setOverrides] = useState<ScheduleOverrideDto[]>([]);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        setVenue("loading");
        getVenue(venueId)
            .then(loaded => {
                setVenue(loaded ?? "missing");
                setOverrides(loaded?.scheduleOverrides ?? []);
            })
            .catch(() => setVenue("missing"));
    }, [venueId]);

    const save = async (next: ScheduleOverrideDto[], success: string) => {
        setSaving(true);
        try {
            await updateVenue(venueId, {scheduleOverrides: next});
            setOverrides(next);
            toast.success(success);
            return true;
        } catch (e) {
            toast.error(saveError(e));
            return false;
        } finally {
            setSaving(false);
        }
    };

    const add = (override: ScheduleOverrideDto, success: string) =>
        save([...overrides, override], success);

    const cancel = (target: ScheduleOverrideDto) =>
        save(overrides.filter(o => o.start !== target.start), t`Cancelled.`);

    return {venue, overrides, saving, add, cancel};
};
