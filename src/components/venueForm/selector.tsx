import type {MessageDescriptor} from "@lingui/core";
import {useLingui} from "@lingui/react/macro";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/shadcn/select.tsx";
import {cn} from "@/lib/utils";

type Options = string[] | Record<string, string | MessageDescriptor>;

export const Selector = ({id, placeholder, options, className, "aria-label": ariaLabel, ...props}: {
    id?: string;
    "aria-label"?: string;
    className?: string;
    name?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    value?: string | null;
    onValueChange?: (value: string | null) => void;
    defaultValue?: string;
    options: Options;
}) => {
    const {i18n} = useLingui();
    const items: Record<string, string> = Array.isArray(options)
        ? Object.fromEntries(options.map(option => [option, option]))
        : Object.fromEntries(Object.entries(options).map(([value, label]) => [value, typeof label === "string" ? label : i18n._(label)]));

    return <Select items={items} {...props}>
        <SelectTrigger id={id} aria-label={ariaLabel} className={cn("w-full", className)}>
            <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent alignItemWithTrigger={false}>
            {Object.entries(items).map(([value, label]) => <SelectItem key={value} value={value}>{label}</SelectItem>)}
        </SelectContent>
    </Select>;
};