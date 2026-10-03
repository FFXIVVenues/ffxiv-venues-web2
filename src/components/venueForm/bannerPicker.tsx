import {Trans, useLingui} from "@lingui/react/macro";
import {useState} from "react";
import {ImageUp} from "lucide-react";
import {Field, FieldDescription, FieldLabel} from "@/components/ui/shadcn/field.tsx";

export const BannerPicker = ({current}: {current?: string}) => {
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
