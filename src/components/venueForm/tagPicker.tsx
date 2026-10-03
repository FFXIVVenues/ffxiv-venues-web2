import type {MessageDescriptor} from "@lingui/core";
import {Trans, useLingui} from "@lingui/react/macro";
import {
    Combobox,
    ComboboxChip,
    ComboboxChips, ComboboxChipsInput, ComboboxContent, ComboboxEmpty, ComboboxItem, ComboboxList,
    ComboboxValue,
    useComboboxAnchor
} from "@/components/ui/shadcn/combobox.tsx";
import {useState} from "react";

export const TagPicker = ({options, descriptions, initialTags, max, placeholder}: {
    options: Record<string, MessageDescriptor>;
    descriptions?: Record<string, MessageDescriptor>;
    initialTags?: string[];
    max?: number;
    placeholder: string;
}) => {
    const {i18n} = useLingui();
    const anchor = useComboboxAnchor();
    const [tags, setTags] = useState(() => (initialTags ?? []).filter(tag => tag in options));
    const label = (tag: string) => i18n._(options[tag]!);

    return <Combobox multiple name="tags" items={Object.keys(options)} itemToStringLabel={label} value={tags} onValueChange={v => setTags(max ? v.slice(0, max) : v)}>
        <ComboboxChips ref={anchor}>
            <ComboboxValue>
               {(selected: string[]) => <>
                   {selected.map(tag => <ComboboxChip key={tag}>{label(tag)}</ComboboxChip>)}
                   <ComboboxChipsInput placeholder={selected.length ? "" : placeholder} />
               </>}
            </ComboboxValue>
        </ComboboxChips>
        <ComboboxContent anchor={anchor}>
            <ComboboxEmpty><Trans>No matches</Trans></ComboboxEmpty>
            <ComboboxList>
                {(tag: string) => {
                    const description = descriptions?.[tag];
                    return <ComboboxItem key={tag} value={tag}>
                        <div className="flex flex-col">
                            <span>{label(tag)}</span>
                            {description && <span className="text-xs text-muted-foreground">{i18n._(description)}</span>}
                        </div>
                    </ComboboxItem>;
                }}
            </ComboboxList>
        </ComboboxContent>
    </Combobox>;
};