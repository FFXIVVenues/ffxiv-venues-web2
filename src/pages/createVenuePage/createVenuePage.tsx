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
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/shadcn/select.tsx";
import {type ReactNode, useState} from "react";
import {districts, worlds} from "@/lib/model/venueOptions.ts";
import {Switch} from "@/components/ui/shadcn/switch.tsx";

export const CreateVenuePage = () => {
    const {t} = useLingui();
    const [locationType, setLocationType] = useState<string | null>("House");
    const [dataCenter, setDataCenter] = useState<string | null>(null);
    const locationTypes = {House: t`House`, Apartment: t`Apartment`, Room: t`Room`};

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        data.forEach((value, key) => console.log(key, value));
    };

    return <DefaultPageLayout title={t`Create a venue`}>
        <DefaultPageLayout.Page>
            <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                <form className="flex flex-col gap-8" onSubmit={submit}>
                    <FieldSet>
                        <FieldLegend><Trans>The basics</Trans></FieldLegend>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="venue-name"><Trans>Venue name</Trans></FieldLabel>
                                <Input id="venue-name" name="name" required placeholder={t`What's your venue called?`} />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="venue-description"><Trans>Description</Trans></FieldLabel>
                                <Textarea id="venue-description" name="description" rows={5} placeholder={t`Give players something to read when they click your venue...`} />
                            </Field>
                        </FieldGroup>
                    </FieldSet>

                    <FieldSet>
                        <FieldLegend><Trans>Where to find you</Trans></FieldLegend>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="venue-type"><Trans>Property type</Trans></FieldLabel>
                                <Selector id="venue-type" name="venueType" items={locationTypes}
                                          value={locationType} onValueChange={setLocationType}>
                                    {Object.entries(locationTypes).map(([value, label]) =>
                                        <SelectItem key={value} value={value}>{label}</SelectItem>)}
                                </Selector>
                            </Field>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Field>
                                    <FieldLabel htmlFor="venue-dc"><Trans>Data center</Trans></FieldLabel>
                                    <Selector id="venue-dc" name="dataCenter" required placeholder={t`Select`}
                                              value={dataCenter} onValueChange={setDataCenter}>
                                        {Object.keys(worlds).map(dc =>
                                            <SelectItem key={dc} value={dc}>{dc}</SelectItem>)}
                                    </Selector>
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="venue-world"><Trans>World</Trans></FieldLabel>
                                    <Selector key={dataCenter} id="venue-world" name="world" required
                                              disabled={!dataCenter} placeholder={t`Select`}>
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

                    <Button type="submit" className="w-fit"><Trans>Create venue</Trans></Button>
                </form>
            </div>
        </DefaultPageLayout.Page>
    </DefaultPageLayout>;
};

const Selector = ({id, placeholder, children, ...props}: {
    id: string;
    name: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    items?: Record<string, string>;
    value?: string | null;
    onValueChange?: (value: string | null) => void;
    children: ReactNode;
}) =>
    <Select {...props}>
        <SelectTrigger id={id} className="w-full"><SelectValue placeholder={placeholder} /></SelectTrigger>
        <SelectContent alignItemWithTrigger={false}>{children}</SelectContent>
    </Select>;

