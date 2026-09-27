import type {ReactNode} from "react";
import {Select, SelectContent, SelectTrigger, SelectValue} from "@/components/ui/shadcn/select.tsx";

export const Selector = ({id, placeholder, children, ...props}: {
    id: string;
    name?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    items?: Record<string, string>;
    value?: string | null;
    onValueChange?: (value: string | null) => void;
    children: ReactNode;
}) =>
    <Select {...props}>
        <SelectTrigger id={id} className="w-full">
            <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent alignItemWithTrigger={false}>{children}</SelectContent>
    </Select>;