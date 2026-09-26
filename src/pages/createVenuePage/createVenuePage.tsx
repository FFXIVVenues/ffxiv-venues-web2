import {DefaultPageLayout} from "@/pageLayoutss/defaultPageLayout.tsx";
import {Field, FieldGroup, FieldLabel, FieldLegend, FieldSet} from "@/components/ui/shadcn/field.tsx";
import {Input} from "@/components/ui/shadcn/input.tsx";
import {Textarea} from "@/components/ui/shadcn/textarea.tsx";
import {Button} from "@/components/ui/shadcn/button.tsx";
import {Trans, useLingui} from "@lingui/react/macro";

export const CreateVenuePage = () => {
    const {t} = useLingui();

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        console.log(data.get("name"), data.get("description"));
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
                                <Input id="venue-name" name="name" required
                                       placeholder={t`What's your venue called?`} />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="venue-description"><Trans>Description</Trans></FieldLabel>
                                <Textarea id="venue-description" name="description" rows={5} placeholder={t`Give players something to read when they click your venue...`} />
                            </Field>
                        </FieldGroup>
                    </FieldSet>

                    <Button type="submit" className="w-fit"><Trans>Create venue</Trans></Button>
                </form>
            </div>
        </DefaultPageLayout.Page>
    </DefaultPageLayout>;
};