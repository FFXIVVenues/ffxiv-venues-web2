import {Trans, useLingui} from "@lingui/react/macro";
import {type KeyboardEvent, useEffect, useRef, useState} from "react";
import {X} from "lucide-react";
import {Field, FieldDescription, FieldError, FieldLabel} from "@/components/ui/shadcn/field.tsx";
import {InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput} from "@/components/ui/shadcn/input-group.tsx";
import {Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle} from "@/components/ui/shadcn/item.tsx";
import {Button} from "@/components/ui/shadcn/button.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/shadcn/avatar.tsx";
import {getDiscordUser} from "@/lib/services/user/getDiscordUser.ts";
import type {User} from "@/lib/services/user/dtos/user.ts";

const discordIdPattern = /^(?:<@!?)?(\d{17,20})>?$/;

type Lookup = User | "checking" | "unknown" | "failed";

const ManagerCard = ({id, onRemove}: {id: string; onRemove: () => void}) => {
    const {t} = useLingui();
    const [lookup, setLookup] = useState<Lookup>("checking");

    useEffect(() => {
        const abort = new AbortController();
        getDiscordUser(id, abort.signal).then(
            user => setLookup(user ?? "unknown"),
            () => !abort.signal.aborted && setLookup("failed"));
        return () => abort.abort();
    }, [id]);

    const found = typeof lookup === "object" ? lookup : null;
    const name = found?.nickname ?? id;

    return <Item variant="outline" size="sm" role="listitem">
        <ItemMedia>
            <Avatar size="lg">
                {found?.avatarUrl && <AvatarImage src={found.avatarUrl} alt="" />}
                <AvatarFallback>{found?.username[0]?.toUpperCase() ?? "?"}</AvatarFallback>
            </Avatar>
        </ItemMedia>
        <ItemContent className="gap-0">
            <ItemTitle>{name}</ItemTitle>
            {found && <ItemDescription>{found.username} ({id})</ItemDescription>}
            {lookup === "unknown" && <ItemDescription className="text-destructive"><Trans>Not found on Discord</Trans></ItemDescription>}
        </ItemContent>
        <ItemActions>
            <Button type="button" variant="ghost" size="icon-sm" aria-label={t`Remove ${name}`} onClick={onRemove}>
                <X />
            </Button>
        </ItemActions>
    </Item>;
};

export const ManagersField = ({value, onChange}: {value: string[]; onChange: (value: string[]) => void}) => {
    const {t} = useLingui();
    const input = useRef<HTMLInputElement>(null);
    const [entry, setEntry] = useState("");
    const id = entry.trim().match(discordIdPattern)?.[1];
    const [checking, setChecking] = useState(false);
    const [unknownId, setUnknownId] = useState<string>();

    const add = async () => {
        if (!id || checking) return;
        if (value.includes(id)) return setEntry("");
        setChecking(true);
        const found = await getDiscordUser(id).catch(() => "failed");
        setChecking(false);
        if (found === null) return setUnknownId(id);
        onChange([...value, id]);
        setEntry("");
    };
    const remove = (manager: string) => onChange(value.filter(other => other !== manager));
    const addOnEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== "Enter") return;
        e.preventDefault();
        add();
    };

    const empty = t`A venue needs at least one manager.`;
    const unknown = t`Discord doesn't know this user. Check the ID and try again.`;
    const problem = !entry.trim() ? (value.length ? "" : empty)
        : !id ? t`That isn't a Discord user ID. It's a long number, like 1234567891011121314.`
            : unknownId === id ? unknown
                : t`Press Add to add this manager, or clear the box.`;
    const shown = id && unknownId === id ? unknown : value.length === 0 ? empty : undefined;

    useEffect(() => input.current?.setCustomValidity(problem), [problem]);

    return <Field data-invalid={!!shown}>
        <FieldLabel htmlFor="venue-managers"><Trans>Discord user ID</Trans></FieldLabel>
        <FieldDescription><Trans>Managers can edit and delete this venue. Check the username under the name before you add someone. Display names can be anything, but usernames are unique.</Trans></FieldDescription>
        <InputGroup>
            <InputGroupInput ref={input} id="venue-managers" value={entry} onChange={e => setEntry(e.target.value)} onKeyDown={addOnEnter} readOnly={checking} placeholder="1234567891011121314" />
            <InputGroupAddon align="inline-end">
                <InputGroupButton disabled={!id || checking} onClick={add}><Trans>Add</Trans></InputGroupButton>
            </InputGroupAddon>
        </InputGroup>
        <FieldError>{shown}</FieldError>
        {value.length > 0 && <ItemGroup>
            {value.map(manager => <ManagerCard key={manager} id={manager} onRemove={() => remove(manager)} />)}
        </ItemGroup>}
    </Field>;
};