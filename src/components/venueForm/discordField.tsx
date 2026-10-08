import {Trans, useLingui} from "@lingui/react/macro";
import {useEffect, useRef, useState} from "react";
import {Field, FieldError, FieldLabel} from "@/components/ui/shadcn/field.tsx";
import {InputGroup, InputGroupAddon, InputGroupInput} from "@/components/ui/shadcn/input-group.tsx";
import {DiscordFillIcon} from "@/components/icons/discord-fill-icon.tsx";

const invitePattern = /^https?:\/\/(?:www\.)?(?:discord\.gg|discord(?:app)?\.com\/invite)\/([\w-]+)\/?$/i;

type InviteStatus = "ok" | "checking" | "malformed" | "unknown" | "temporary";

const checkInvite = async (code: string, signal: AbortSignal): Promise<InviteStatus> => {
    const response = await fetch(`https://discord.com/api/v10/invites/${code}?with_expiration=true`, {signal});
    if (response.status === 404) return "unknown";
    if (!response.ok) return "ok";
    const invite: {expires_at: string | null} = await response.json();
    return invite.expires_at ? "temporary" : "ok";
};

export const DiscordField = ({value, onChange}: {value: string; onChange: (value: string) => void}) => {
    const {t} = useLingui();
    const input = useRef<HTMLInputElement>(null);
    const [status, setStatus] = useState<InviteStatus>("ok");

    useEffect(() => {
        const link = value.trim();
        if (!link) return setStatus("ok");

        setStatus("checking");
        const abort = new AbortController();
        const timer = setTimeout(() => {
            const code = link.match(invitePattern)?.[1];
            if (!code) return setStatus("malformed");
            checkInvite(code, abort.signal).then(setStatus, () => !abort.signal.aborted && setStatus("ok"));
        }, 500);
        return () => {
            clearTimeout(timer);
            abort.abort();
        };
    }, [value]);

    const errors: Partial<Record<InviteStatus, string>> = {
        malformed: t`That doesn't look like a Discord invite. It should look like https://discord.gg/yourvenue`,
        unknown: t`Discord doesn't recognise this invite. Has it been deleted?`,
        temporary: t`This invite expires. Make one that never expires so guests can always join.`,
    };
    const error = errors[status];

    useEffect(() => input.current?.setCustomValidity(status === "checking" ? t`Checking your Discord invite...` : error ?? ""), [status, error, t]);

    return <Field data-invalid={!!error}>
        <FieldLabel htmlFor="venue-discord"><Trans>Discord invite</Trans></FieldLabel>
        <InputGroup>
            <InputGroupAddon><DiscordFillIcon className="size-4" strokeWidth={0} fill="currentColor" /></InputGroupAddon>
            <InputGroupInput ref={input} id="venue-discord" type="url" aria-invalid={!!error} value={value} onChange={e => onChange(e.target.value)} placeholder="https://discord.gg/..." />
        </InputGroup>
        <FieldError>{error}</FieldError>
    </Field>;
};
