import {Trans, useLingui} from "@lingui/react/macro";
import {useEffect, useMemo, useState} from "react";
import {ImageUp} from "lucide-react";
import {Field, FieldDescription, FieldError, FieldLabel} from "@/components/ui/shadcn/field.tsx";

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

export const BannerPicker = ({current, value, onChange}: {
    current?: string;
    value: Blob | null;
    onChange: (banner: Blob) => void;
}) => {
    const {t} = useLingui();
    const [unreadable, setUnreadable] = useState(false);
    const preview = useMemo(() => value && URL.createObjectURL(value), [value]);
    useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

    const pick = (file: File | undefined) => {
        if (!file) return;
        toBanner(file).then(banner => {
            setUnreadable(false);
            onChange(banner);
        }, () => setUnreadable(true));
    };

    const shown = preview ?? current;

    return <Field data-invalid={unreadable}>
        <FieldLabel htmlFor="venue-banner"><Trans>Banner image</Trans></FieldLabel>
        <label htmlFor="venue-banner" className="flex aspect-2/1 w-full cursor-pointer items-center justify-center overflow-hidden rounded-md border border-dashed border-input bg-input/30 text-muted-foreground transition-colors hover:border-ring hover:text-foreground">
            {shown
                ? <img src={shown} alt={t`Banner preview`} className="h-full w-full object-cover" />
                : <span className="flex flex-col items-center gap-2 text-sm font-medium">
                    <ImageUp className="size-7" />
                    <Trans>Click to choose an image</Trans>
                </span>
            }
        </label>
        <input id="venue-banner" type="file" accept="image/*" className="sr-only" onChange={e => pick(e.target.files?.[0])} />
        <FieldDescription><Trans>Any image works; banners are 600x300 and I'll handle the scaling and cropping for you <span aria-hidden="true">❤️</span></Trans></FieldDescription>
        {unreadable && <FieldError><Trans>I couldn't read that image. Try a PNG, JPEG or WebP.</Trans></FieldError>}
    </Field>;
};
