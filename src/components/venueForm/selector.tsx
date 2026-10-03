import type {MessageDescriptor} from "@lingui/core";
import {useLingui} from "@lingui/react/macro";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/shadcn/select.tsx";
import {cn} from "@/lib/utils";

export const Selector = ({id, label, placeholder, options, className, ...props}: {
    id?: string;
    label?: string;
    className?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    value?: string | null;
    onValueChange?: (value: string | null) => void;
    options: string[] | Record<string, string | MessageDescriptor>;
}) => {
    const {i18n} = useLingui();
    const items: Record<string, string> = Array.isArray(options)
        ? Object.fromEntries(options.map(option => [option, option]))
        : Object.fromEntries(Object.entries(options).map(([value, text]) => [value, typeof text === "string" ? text : i18n._(text)]));

    return <Select items={items} {...props}>
        <SelectTrigger id={id} aria-label={label} className={cn("w-full", className)}>
            <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent alignItemWithTrigger={false}>
            {Object.entries(items).map(([value, text]) => <SelectItem key={value} value={value}>{text}</SelectItem>)}
        </SelectContent>
    </Select>;
};