import type {VenueDto, VenueRequestDto} from "@/lib/services/venues2/dtos/venueDto.ts";
import {Trans, useLingui} from "@lingui/react/macro";
import {type ReactNode, type SubmitEventHandler, useState} from "react";
import {Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet} from "@/components/ui/shadcn/field.tsx";
import {Globe, X} from "lucide-react";
import {Button} from "@/components/ui/shadcn/button.tsx";
import {Input} from "@/components/ui/shadcn/input.tsx";
import {Textarea} from "@/components/ui/shadcn/textarea.tsx";
import {Selector} from "@/components/venueForm/selector.tsx";
import {districts, features, games, scenes, tagDescriptions, worlds} from "@/lib/model/venueOptions.ts";
import {Switch} from "@/components/ui/shadcn/switch.tsx";
import {TagPicker} from "@/components/venueForm/tagPicker.tsx";
import {InputGroup, InputGroupAddon, InputGroupInput} from "@/components/ui/shadcn/input-group.tsx";
import {DiscordFillIcon} from "@/components/icons/discord-fill-icon.tsx";
import {ScheduleBuilder} from "@/components/venueForm/scheduleBuilder.tsx";
import {BannerPicker} from "@/components/venueForm/bannerPicker.tsx";
import {toDraft, toVenue, type VenueDraft} from "@/components/venueForm/venueDraft.ts";
import {Badge} from "@/components/ui/shadcn/badge.tsx";

const toBanner = async (file: File) => {
    const image = await createImageBitmap(file);
    const scale = Math.max(600 / image.width, 300 / image.height);
    const cropWidth = 600 / scale;
    const cropHeight = 300 / scale;
    const banner = await createImageBitmap(image, (image.width - cropWidth) / 2, (image.height - cropHeight) / 2, cropWidth, cropHeight, {resizeWidth: 600, resizeHeight: 300, resizeQuality: "high"});

    const canvas = new OffscreenCanvas(600, 300);
    canvas.getContext("2d")!.drawImage(banner, 0, 0, 600, 300);
    return canvas.convertToBlob({type: "image/webp", quality: 1});
};

export const VenueForm = ({venue, submitLabel, onSubmit}: {
    venue?: VenueDto;
    submitLabel: ReactNode;
    onSubmit: (venue: VenueRequestDto, banner: Blob | null) => Promise<void>;
}) => {
    const {t} = useLingui();
    const [draft, setDraft] = useState(() => toDraft(venue));
    const set = (changes: Partial<VenueDraft>) => setDraft(draft => ({...draft, ...changes}));

    const isOffered = (tag: string) => [scenes, features, games].some(options => tag in options);
    const legacyTags = draft.tags.filter(tag => !isOffered(tag));
    const removeTag = (tag: string) => set({tags: draft.tags.filter(other => other !== tag)});

    const locationTypes = {House: t`House`, Apartment: t`Apartment`, Room: t`Room`, Other: t({message: `Other`, comment: `Property type: a location that isn't a house, apartment or room`})};

    const [saving, setSaving] = useState(false);
    const submit: SubmitEventHandler<HTMLFormElement> = async e => {
        e.preventDefault();
        setSaving(true);
        try {
            await onSubmit(toVenue(draft), draft.banner ? await toBanner(draft.banner) : null);
        } finally {
            setSaving(false);
        }
    };

    return <form className="flex flex-col gap-8" onSubmit={submit}>
        <FieldSet>
            <FieldLegend><Trans>The basics</Trans></FieldLegend>
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="venue-name"><Trans>Venue name</Trans></FieldLabel>
                    <Input id="venue-name" required value={draft.name} onChange={e => set({name: e.target.value})} placeholder={t`What's your venue called?`} />
                </Field>
                <Field>
                    <FieldLabel htmlFor="venue-description"><Trans>Description</Trans></FieldLabel>
                    <Textarea id="venue-description" rows={5} value={draft.description} onChange={e => set({description: e.target.value})} placeholder={t`Give guests something to read when they click your venue...`} />
                </Field>
            </FieldGroup>
        </FieldSet>

        <FieldSet>
            <FieldLegend><Trans>Where to find you</Trans></FieldLegend>
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="venue-type"><Trans>Property type</Trans></FieldLabel>
                    <Selector id="venue-type" options={locationTypes} value={draft.locationType} onValueChange={type => set({locationType: type as VenueDraft["locationType"]})} />
                </Field>

                {draft.locationType !== "Other" && <>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Field>
                            <FieldLabel htmlFor="venue-dc"><Trans>Data center</Trans></FieldLabel>
                            <Selector id="venue-dc" required placeholder={t`Select`} options={Object.keys(worlds)} value={draft.dataCenter || null} onValueChange={dataCenter => set({dataCenter: dataCenter ?? "", world: ""})} />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="venue-world"><Trans>World</Trans></FieldLabel>
                            <Selector id="venue-world" required disabled={!draft.dataCenter} placeholder={t`Select`} options={worlds[draft.dataCenter] ?? []} value={draft.world || null} onValueChange={world => set({world: world ?? ""})} />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="venue-district"><Trans>Housing district</Trans></FieldLabel>
                            <Selector id="venue-district" required placeholder={t`Select`} options={districts} value={draft.district || null} onValueChange={district => set({district: district ?? ""})} />
                        </Field>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Field>
                            <FieldLabel htmlFor="venue-ward"><Trans>Ward</Trans></FieldLabel>
                            <Input id="venue-ward" type="number" min={1} max={30} placeholder="1-30" required value={draft.ward || ""} onChange={e => set({ward: Number(e.target.value)})} />
                        </Field>
                        {draft.locationType !== "Apartment" && <Field>
                            <FieldLabel htmlFor="venue-plot"><Trans>Plot</Trans></FieldLabel>
                            <Input id="venue-plot" type="number" min={1} max={60} placeholder="1-60" required value={draft.plot || ""} onChange={e => set({plot: Number(e.target.value)})} />
                        </Field>}
                        {draft.locationType === "Apartment" && <Field>
                            <FieldLabel htmlFor="venue-apartment"><Trans>Apartment number</Trans></FieldLabel>
                            <Input id="venue-apartment" type="number" min={1} max={90} placeholder="1-90" required value={draft.apartment || ""} onChange={e => set({apartment: Number(e.target.value)})} />
                        </Field>}
                        {draft.locationType === "Room" && <Field>
                            <FieldLabel htmlFor="venue-room"><Trans>Room number</Trans></FieldLabel>
                            <Input id="venue-room" type="number" min={1} max={512} placeholder="1-512" required value={draft.room || ""} onChange={e => set({room: Number(e.target.value)})} />
                        </Field>}
                    </div>
                </>}

                {draft.locationType === "Other" && <Field>
                    <FieldLabel htmlFor="venue-override"><Trans>Location</Trans></FieldLabel>
                    <Input id="venue-override" required value={draft.override} onChange={e => set({override: e.target.value})} placeholder={t`Where can guests find you?`} />
                </Field>}

                {draft.locationType === "Apartment" && <Field orientation="horizontal">
                    <Switch id="venue-subdivision" checked={draft.subdivision} onCheckedChange={subdivision => set({subdivision})} />
                    <FieldContent>
                        <FieldLabel htmlFor="venue-subdivision"><Trans>Subdivision</Trans></FieldLabel>
                        <FieldDescription><Trans>Is your apartment in the ward's subdivision?</Trans></FieldDescription>
                    </FieldContent>
                </Field>}
            </FieldGroup>
        </FieldSet>

        <FieldSet>
            <FieldLegend><Trans>The vibe</Trans></FieldLegend>
            <FieldGroup>
                <Field orientation="horizontal">
                    <Switch id="venue-sfw" checked={draft.sfw} onCheckedChange={sfw => set({sfw})} />
                    <FieldContent>
                        <FieldLabel htmlFor="venue-sfw"><Trans>SFW on entry</Trans></FieldLabel>
                        <FieldDescription><Trans>On means no nudity or erotic content out in the open</Trans></FieldDescription>
                    </FieldContent>
                </Field>
                <Field>
                    <FieldLabel><Trans>Scenes</Trans></FieldLabel>
                    <TagPicker options={scenes} max={2} placeholder={t`Search scenes...`} value={draft.tags} onChange={tags => set({tags})} />
                    <FieldDescription><Trans>Pick up to 2 that fit best <span aria-hidden="true">🙂</span></Trans></FieldDescription>
                </Field>
                <Field>
                    <FieldLabel><Trans>Features</Trans></FieldLabel>
                    <TagPicker options={features} descriptions={tagDescriptions} placeholder={t`Search features...`} value={draft.tags} onChange={tags => set({tags})} />
                    <FieldDescription><Trans>Tap everything your venue offers <span aria-hidden="true">😊</span></Trans></FieldDescription>
                </Field>
                <Field>
                    <FieldLabel><Trans>Games</Trans></FieldLabel>
                    <TagPicker options={games} descriptions={tagDescriptions} placeholder={t`Search games...`} value={draft.tags} onChange={tags => set({tags})} />
                    <FieldDescription><Trans>Anything guests can join in on.</Trans></FieldDescription>
                </Field>

                {legacyTags.length > 0 && <Field>
                    <FieldLabel><Trans>Legacy tags</Trans></FieldLabel>
                    <div className="flex flex-wrap gap-2">
                        {legacyTags.map(tag => <Badge key={tag} variant="secondary" className="gap-1 pr-0.5">
                            {tag}
                            <Button type="button" variant="ghost" size="icon-xs" aria-label={t`Remove ${tag}`} onClick={() => removeTag(tag)}>
                                <X />
                            </Button>
                        </Badge>)}
                    </div>
                    <FieldDescription><Trans>These tags aren't offered anymore, so you can only remove them.</Trans></FieldDescription>
                </Field>}
            </FieldGroup>
        </FieldSet>

        <FieldSet>
            <FieldLegend><Trans>Your links</Trans></FieldLegend>
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="venue-discord"><Trans>Discord invite</Trans></FieldLabel>
                    <InputGroup>
                        <InputGroupAddon><DiscordFillIcon className="size-4" strokeWidth={0} fill="currentColor" /></InputGroupAddon>
                        <InputGroupInput id="venue-discord" type="url" value={draft.discord} onChange={e => set({discord: e.target.value})} placeholder="https://discord.gg/..." />
                    </InputGroup>
                </Field>
                <Field>
                    <FieldLabel htmlFor="venue-website"><Trans>Website</Trans></FieldLabel>
                    <InputGroup>
                        <InputGroupAddon><Globe className="size-4" /></InputGroupAddon>
                        <InputGroupInput id="venue-website" type="url" value={draft.website} onChange={e => set({website: e.target.value})} placeholder="https://..." />
                    </InputGroup>
                </Field>
            </FieldGroup>
        </FieldSet>

        <FieldSet>
            <FieldLegend><Trans>Opening hours</Trans></FieldLegend>
            <FieldGroup>
                <ScheduleBuilder slots={draft.slots} timeZone={draft.timeZone} onChange={set} />
            </FieldGroup>
        </FieldSet>

        <FieldSet>
            <FieldGroup>
                <BannerPicker current={venue?.banner ?? undefined} value={draft.banner} onChange={banner => set({banner})} />
            </FieldGroup>
        </FieldSet>
        <Button type="submit" disabled={saving} className="w-fit">{submitLabel}</Button>
    </form>;
};