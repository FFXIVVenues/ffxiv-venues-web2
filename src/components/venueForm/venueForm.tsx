import type {VenueDto} from "@/lib/services/venues/dtos/venueDto.ts";
import type {LocationDto} from "@/lib/services/venues/dtos/locationDto.ts";
import {Trans, useLingui} from "@lingui/react/macro";
import {type ReactNode, type SubmitEventHandler, useState} from "react";
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet
} from "@/components/ui/shadcn/field.tsx";
import {Globe, ImageUp} from "lucide-react";
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

export type NewVenue = Pick<VenueDto, "name" | "description" | "website" | "discord" | "sfw" | "tags" | "schedule"> & {location: Omit<LocationDto, "shard" | "override">};

const toNewVenue = (data: FormData): NewVenue => {
    const text = (key: string) => String(data.get(key) ?? "").trim();
    const plot = Number(data.get("plot"));

    return {
        name: text("name"),
        description: text("description").split(/\n\s*\n/).map(paragraph => paragraph.trim()).filter(Boolean),
        location: {
            dataCenter: text("dataCenter"),
            world: text("world"),
            district: text("district"),
            ward: Number(data.get("ward")),
            plot,
            apartment: Number(data.get("apartment")),
            room: Number(data.get("room")),
            subdivision: plot ? plot > 30 : data.has("subdivision"),
        },
        website: text("website") || undefined,
        discord: text("discord") || undefined,
        sfw: data.has("sfw"),
        tags: data.getAll("tags").map(String),
        schedule: JSON.parse(text("schedule") || "[]"),
    };
};

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

const BannerPicker = ({current}: {current?: string}) => {
    const {t} = useLingui();
    const [preview, setPreview] = useState<string | null>(null);

    const choose = (file: File | undefined) => {
        if (preview) URL.revokeObjectURL(preview);
        setPreview(file ? URL.createObjectURL(file) : null);
    };

    const shown = preview ?? current;

    return <Field>
        <FieldLabel htmlFor="venue-banner"><Trans>Banner image</Trans></FieldLabel>
        <label htmlFor="venue-banner" className="flex aspect-[2/1] w-full cursor-pointer items-center justify-center overflow-hidden rounded-md border border-dashed border-input bg-input/30 text-muted-foreground transition-colors hover:border-ring hover:text-foreground">
            {shown
                ? <img src={shown} alt={t`Banner preview`} className="h-full w-full object-cover" />
                : <span className="flex flex-col items-center gap-2 text-sm font-medium">
                    <ImageUp className="size-7" />
                    <Trans>Click to choose an image</Trans>
                </span>
            }
        </label>
        <input id="venue-banner" name="banner" type="file" accept="image/*" className="sr-only" onChange={e => choose(e.target.files?.[0])} />
        <FieldDescription><Trans>Any image works; banners are 600x300 and I'll handle the scaling and cropping for you <span aria-hidden="true">❤️</span></Trans></FieldDescription>
    </Field>;
};

export const VenueForm = ({venue, submitLabel, onSubmit}: {
    venue?: VenueDto;
    submitLabel: ReactNode;
    onSubmit: (venue: NewVenue, banner: Blob | null) => void;
}) => {
    const {t} = useLingui();
    const location = venue?.location;
    const [locationType, setLocationType] = useState<string | null>(location?.apartment ? "Apartment" : location?.room ? "Room" : "House");
    const [dataCenter, setDataCenter] = useState<string | null>(location?.dataCenter ?? null);
    const locationTypes = {House: t`House`, Apartment: t`Apartment`, Room: t`Room`};

    const venueTags = (venue?.tags ?? []).filter(Boolean);
    const isOffered = (tag: string) => [scenes, features, games].some(options => Object.hasOwn(options, tag));
    const legacyTags = venueTags.filter(tag => !isOffered(tag));

    const submit: SubmitEventHandler<HTMLFormElement> = async e => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const file = data.get("banner");
        const banner = file instanceof File && file.size > 0 ? await toBanner(file) : null;
        onSubmit(toNewVenue(data), banner);
    };

    return <form className="flex flex-col gap-8" onSubmit={submit}>
        <FieldSet>
            <FieldLegend><Trans>The basics</Trans></FieldLegend>
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="venue-name"><Trans>Venue name</Trans></FieldLabel>
                    <Input id="venue-name" name="name" required defaultValue={venue?.name} placeholder={t`What's your venue called?`} />
                </Field>
                <Field>
                    <FieldLabel htmlFor="venue-description"><Trans>Description</Trans></FieldLabel>
                    <Textarea id="venue-description" name="description" rows={5} defaultValue={venue?.description.join("\n\n")} placeholder={t`Give guests something to read when they click your venue...`} />
                </Field>
            </FieldGroup>
        </FieldSet>

        {/* Location */}
        <FieldSet>
            <FieldLegend><Trans>Where to find you</Trans></FieldLegend>
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="venue-type"><Trans>Property type</Trans></FieldLabel>
                    <Selector id="venue-type" name="venueType" options={locationTypes} value={locationType} onValueChange={setLocationType} />
                </Field>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Field>
                        <FieldLabel htmlFor="venue-dc"><Trans>Data center</Trans></FieldLabel>
                        <Selector id="venue-dc" name="dataCenter" required placeholder={t`Select`} options={Object.keys(worlds)} value={dataCenter} onValueChange={setDataCenter} />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="venue-world"><Trans>World</Trans></FieldLabel>
                        <Selector key={dataCenter} id="venue-world" name="world" required disabled={!dataCenter} defaultValue={dataCenter === location?.dataCenter ? location?.world : undefined} placeholder={t`Select`} options={worlds[dataCenter ?? ""] ?? []} />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="venue-district"><Trans>Housing district</Trans></FieldLabel>
                        <Selector id="venue-district" name="district" required defaultValue={location?.district} placeholder={t`Select`} options={districts} />
                    </Field>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Field>
                        <FieldLabel htmlFor="venue-ward"><Trans>Ward</Trans></FieldLabel>
                        <Input id="venue-ward" name="ward" type="number" min={1} max={30} placeholder="1-30" required defaultValue={location?.ward} />
                    </Field>
                    {locationType !== "Apartment" && <Field>
                        <FieldLabel htmlFor="venue-plot"><Trans>Plot</Trans></FieldLabel>
                        <Input id="venue-plot" name="plot" type="number" min={1} max={60} placeholder="1-60" required defaultValue={location?.plot || undefined} />
                    </Field>}
                    {locationType === "Apartment" && <Field>
                        <FieldLabel htmlFor="venue-apartment"><Trans>Apartment number</Trans></FieldLabel>
                        <Input id="venue-apartment" name="apartment" type="number" min={1} max={90} placeholder="1-90" required defaultValue={location?.apartment || undefined} />
                    </Field>}
                    {locationType === "Room" && <Field>
                        <FieldLabel htmlFor="venue-room"><Trans>Room number</Trans></FieldLabel>
                        <Input id="venue-room" name="room" type="number" min={1} max={512} placeholder="1-512" required defaultValue={location?.room || undefined} />
                    </Field>}
                </div>

                {locationType === "Apartment" && <Field orientation="horizontal">
                    <Switch id="venue-subdivision" name="subdivision" defaultChecked={location?.subdivision} />
                    <FieldContent>
                        <FieldLabel htmlFor="venue-subdivision"><Trans>Subdivision</Trans></FieldLabel>
                        <FieldDescription><Trans>Is your apartment in the ward's subdivision?</Trans></FieldDescription>
                    </FieldContent>
                </Field>}
            </FieldGroup>
        </FieldSet>

        {/* Venue Tags */}
        <FieldSet>
            <FieldLegend><Trans>The vibe</Trans></FieldLegend>
            <FieldGroup>
                <Field orientation="horizontal">
                    <Switch id="venue-sfw" name="sfw" defaultChecked={venue?.sfw} />
                    <FieldContent>
                        <FieldLabel htmlFor="venue-sfw"><Trans>SFW on entry</Trans></FieldLabel>
                        <FieldDescription><Trans>On means no nudity or erotic content out in the open</Trans></FieldDescription>
                    </FieldContent>
                </Field>
                <Field>
                    <FieldLabel><Trans>Scenes</Trans></FieldLabel>
                    <TagPicker options={scenes} max={2} placeholder={t`Search scenes...`} initialTags={venueTags} />
                    <FieldDescription><Trans>Pick up to 2 that fit best <span aria-hidden="true">🙂</span></Trans></FieldDescription>
                </Field>
                <Field>
                    <FieldLabel><Trans>Features</Trans></FieldLabel>
                    <TagPicker options={features} descriptions={tagDescriptions} placeholder={t`Search features...`} initialTags={venueTags} />
                    <FieldDescription><Trans>Tap everything your venue offers <span aria-hidden="true">😊</span></Trans></FieldDescription>
                </Field>
                <Field>
                    <FieldLabel><Trans>Games</Trans></FieldLabel>
                    <TagPicker options={games} descriptions={tagDescriptions} placeholder={t`Search games...`} initialTags={venueTags} />
                    <FieldDescription><Trans>Anything guests can join in on.</Trans></FieldDescription>
                </Field>
            </FieldGroup>
        </FieldSet>
        {legacyTags.map(tag => <input key={tag} type="hidden" name="tags" value={tag} />)}

        {/* Venue Discord/Site */}
        <FieldSet>
            <FieldLegend><Trans>Your links</Trans></FieldLegend>
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="venue-discord"><Trans>Discord invite</Trans></FieldLabel>
                    <InputGroup>
                        <InputGroupAddon><DiscordFillIcon className="size-4" strokeWidth={0} fill="currentColor" /></InputGroupAddon>
                        <InputGroupInput id="venue-discord" name="discord" type="url" defaultValue={venue?.discord ?? undefined} placeholder="https://discord.gg/..." />
                    </InputGroup>
                </Field>
                <Field>
                    <FieldLabel htmlFor="venue-website"><Trans>Website</Trans></FieldLabel>
                    <InputGroup>
                        <InputGroupAddon><Globe className="size-4" /></InputGroupAddon>
                        <InputGroupInput id="venue-website" name="website" type="url" defaultValue={venue?.website ?? undefined} placeholder="https://..." />
                    </InputGroup>
                </Field>
            </FieldGroup>
        </FieldSet>

        {/* Venue Schedule */}
        <FieldSet>
            <FieldLegend><Trans>Opening hours</Trans></FieldLegend>
            <FieldGroup>
                <ScheduleBuilder initialSchedule={venue?.schedule} />
            </FieldGroup>
        </FieldSet>

        {/* Venue Banner */}
        <FieldSet>
            <FieldGroup>
                <BannerPicker current={venue?.bannerUri ?? undefined} />
            </FieldGroup>
        </FieldSet>
        <Button type="submit" className="w-fit">{submitLabel}</Button>
    </form>;
};