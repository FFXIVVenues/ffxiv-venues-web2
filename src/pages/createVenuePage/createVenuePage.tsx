import {DefaultPageLayout} from "@/pageLayoutss/defaultPageLayout.tsx";
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet
} from "@/components/ui/shadcn/field.tsx";
import {Input} from "@/components/ui/shadcn/input.tsx";
import {Textarea} from "@/components/ui/shadcn/textarea.tsx";
import {Button} from "@/components/ui/shadcn/button.tsx";
import {Trans, useLingui} from "@lingui/react/macro";
import {SelectItem} from "@/components/ui/shadcn/select.tsx";
import {type SubmitEventHandler, useState} from "react";
import {districts, features, games, scenes, worlds} from "@/lib/model/venueOptions.ts";
import {Switch} from "@/components/ui/shadcn/switch.tsx";
import {TagPicker} from "@/pages/createVenuePage/tagPicker.tsx";
import {InputGroup, InputGroupAddon, InputGroupInput} from "@/components/ui/shadcn/input-group.tsx";
import {DiscordFillIcon} from "@/components/icons/discord-fill-icon.tsx";
import {Globe, ImageUp} from "lucide-react";
import {ScheduleBuilder} from "@/pages/createVenuePage/scheduleBuilder.tsx";
import {Selector} from "@/pages/createVenuePage/selector.tsx";
import type {VenueDto} from "@/lib/services/venues/dtos/venueDto.ts";
import type {LocationDto} from "@/lib/services/venues/dtos/locationDto.ts";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/shadcn/avatar.tsx";
import veni from "@/assets/veni.webp";

type NewVenue = Pick<VenueDto, "name" | "description" | "website" | "discord" | "sfw" | "tags" | "schedule"> & {location: Omit<LocationDto, "shard" | "override">};

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

export const CreateVenuePage = () => {
    const {t} = useLingui();
    const [locationType, setLocationType] = useState<string | null>("House");
    const [dataCenter, setDataCenter] = useState<string | null>(null);
    const locationTypes = {House: t`House`, Apartment: t`Apartment`, Room: t`Room`};

    const submit: SubmitEventHandler<HTMLFormElement> = async e => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        console.log(toNewVenue(data)); // Venue Object

        const file = data.get("banner");
        if (file instanceof File && file.size > 0) {
            const banner = await toBanner(file);
            console.log(banner.type, Math.round(banner.size / 1024) + " KB"); // Banner Image
        }
    };

    return <DefaultPageLayout title={t`Create a venue`}>
        <DefaultPageLayout.Page>
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                <div className="flex items-center gap-3 mb-8">
                    <Avatar>
                        <AvatarImage src={veni} alt="Veni Ki" />
                        <AvatarFallback>VK</AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="text-xl font-medium"><Trans>Let's create your venue! <span aria-hidden="true">❤️</span></Trans></h1>
                        <p className="text-sm text-muted-foreground"><Trans>Fill this in and I'll get your venue listed</Trans></p>
                    </div>
                </div>

                <form className="flex flex-col gap-8" onSubmit={submit}>
                    {/* Venue Info */}
                    <FieldSet>
                        <FieldLegend><Trans>The basics</Trans></FieldLegend>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="venue-name"><Trans>Venue name</Trans></FieldLabel>
                                <Input id="venue-name" name="name" required placeholder={t`What's your venue called?`} />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="venue-description"><Trans>Description</Trans></FieldLabel>
                                <Textarea id="venue-description" name="description" rows={5} placeholder={t`Give guests something to read when they click your venue...`} />
                            </Field>
                        </FieldGroup>
                    </FieldSet>

                    {/* Location */}
                    <FieldSet>
                        <FieldLegend><Trans>Where to find you</Trans></FieldLegend>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="venue-type"><Trans>Property type</Trans></FieldLabel>
                                <Selector id="venue-type" name="venueType" items={locationTypes} value={locationType} onValueChange={setLocationType}>
                                    {Object.entries(locationTypes).map(([value, label]) => <SelectItem key={value} value={value}>{label}</SelectItem>)}
                                </Selector>
                            </Field>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Field>
                                    <FieldLabel htmlFor="venue-dc"><Trans>Data center</Trans></FieldLabel>
                                    <Selector id="venue-dc" name="dataCenter" required placeholder={t`Select`} value={dataCenter} onValueChange={setDataCenter}>
                                        {Object.keys(worlds).map(dc => <SelectItem key={dc} value={dc}>{dc}</SelectItem>)}
                                    </Selector>
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="venue-world"><Trans>World</Trans></FieldLabel>
                                    <Selector key={dataCenter} id="venue-world" name="world" required disabled={!dataCenter} placeholder={t`Select`}>
                                        {(worlds[dataCenter ?? ""] ?? []).map(w => <SelectItem key={w} value={w}>{w}</SelectItem>)}
                                    </Selector>
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="venue-district"><Trans>Housing district</Trans></FieldLabel>
                                    <Selector id="venue-district" name="district" required placeholder={t`Select`}>
                                        {districts.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                                    </Selector>
                                </Field>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Field>
                                    <FieldLabel htmlFor="venue-ward"><Trans>Ward</Trans></FieldLabel>
                                    <Input id="venue-ward" name="ward" type="number" min={1} max={30} placeholder="1-30" required />
                                </Field>
                                {locationType !== "Apartment" && <Field>
                                    <FieldLabel htmlFor="venue-plot"><Trans>Plot</Trans></FieldLabel>
                                    <Input id="venue-plot" name="plot" type="number" min={1} max={60} placeholder="1-60" required />
                                </Field>}
                                {locationType === "Apartment" && <Field>
                                    <FieldLabel htmlFor="venue-apartment"><Trans>Apartment number</Trans></FieldLabel>
                                    <Input id="venue-apartment" name="apartment" type="number" min={1} max={90} placeholder="1-90" required />
                                </Field>}
                                {locationType === "Room" && <Field>
                                    <FieldLabel htmlFor="venue-room"><Trans>Room number</Trans></FieldLabel>
                                    <Input id="venue-room" name="room" type="number" min={1} max={512} placeholder="1-512" required />
                                </Field>}
                            </div>

                            {locationType === "Apartment" && <Field orientation="horizontal">
                                <Switch id="venue-subdivision" name="subdivision" />
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
                                <Switch id="venue-sfw" name="sfw" />
                                <FieldContent>
                                    <FieldLabel htmlFor="venue-sfw"><Trans>SFW on entry</Trans></FieldLabel>
                                    <FieldDescription><Trans>On means no nudity or erotic content out in the open</Trans></FieldDescription>
                                </FieldContent>
                            </Field>
                            <Field>
                                <FieldLabel><Trans>Scenes</Trans></FieldLabel>
                                <TagPicker options={scenes} max={2} placeholder={t`Search scenes...`} />
                                <FieldDescription><Trans>Pick up to 2 that fit best <span aria-hidden="true">🙂</span></Trans></FieldDescription>
                            </Field>
                            <Field>
                                <FieldLabel><Trans>Features</Trans></FieldLabel>
                                <TagPicker options={features} placeholder={t`Search features...`} />
                                <FieldDescription><Trans>Tap everything your venue offers <span aria-hidden="true">😊</span></Trans></FieldDescription>
                            </Field>
                            <Field>
                                <FieldLabel><Trans>Games</Trans></FieldLabel>
                                <TagPicker options={games} placeholder={t`Search games...`} />
                                <FieldDescription><Trans>Anything guests can join in on.</Trans></FieldDescription>
                            </Field>
                        </FieldGroup>
                    </FieldSet>

                    {/* Venue Discord/Site */}
                    <FieldSet>
                        <FieldLegend><Trans>Your links</Trans></FieldLegend>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="venue-discord"><Trans>Discord invite</Trans></FieldLabel>
                                <InputGroup>
                                    <InputGroupAddon><DiscordFillIcon className="size-4" strokeWidth={0} fill="currentColor" /></InputGroupAddon>
                                    <InputGroupInput id="venue-discord" name="discord" type="url" placeholder="https://discord.gg/..." />
                                </InputGroup>
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="venue-website"><Trans>Website</Trans></FieldLabel>
                                <InputGroup>
                                    <InputGroupAddon><Globe className="size-4" /></InputGroupAddon>
                                    <InputGroupInput id="venue-website" name="website" type="url" placeholder="https://..." />
                                </InputGroup>
                            </Field>
                        </FieldGroup>
                    </FieldSet>

                    {/* Venue Schedule */}
                    <FieldSet>
                        <FieldLegend><Trans>Opening hours</Trans></FieldLegend>
                        <FieldGroup>
                            <ScheduleBuilder />
                        </FieldGroup>
                    </FieldSet>

                    {/* Venue Banner */}
                    <FieldSet>
                        <FieldGroup>
                            <BannerPicker />
                        </FieldGroup>
                    </FieldSet>

                    <Button type="submit" className="w-fit"><Trans>Create venue</Trans></Button>
                </form>
            </div>
        </DefaultPageLayout.Page>
    </DefaultPageLayout>;
};

const BannerPicker = () => {
    const {t} = useLingui();
    const [preview, setPreview] = useState<string | null>(null);

    const choose = (file: File | undefined) => {
        if (preview) URL.revokeObjectURL(preview);
        setPreview(file ? URL.createObjectURL(file) : null);
    };

    return <Field>
        <FieldLabel htmlFor="venue-banner"><Trans>Banner image</Trans></FieldLabel>
        <label htmlFor="venue-banner" className="flex aspect-[2/1] w-full cursor-pointer items-center justify-center overflow-hidden rounded-md border border-dashed border-input bg-input/30 text-muted-foreground transition-colors hover:border-ring hover:text-foreground">
            {preview
                ? <img src={preview} alt={t`Banner preview`} className="h-full w-full object-cover" />
                : <span className="flex flex-col items-center gap-2 text-sm font-medium">
                    <ImageUp className="size-7" />
                    <Trans>Click to choose an image</Trans>
                </span>
            }
        </label>
        <input id="venue-banner" name="banner" type="file" accept="image/*" className="sr-only" onChange={e => choose(e.target.files?.[0])} />
        <FieldDescription><Trans>Any image works; banners are 600x300 and I'll handle the scaling and cropping for you <span aria-hidden="true">❤️</span></Trans></FieldDescription>
    </Field>;
}