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

export const TagPicker = ({options, max, placeholder}: {
    options: Record<string, MessageDescriptor>;
    max?: number;
    placeholder: string;
}) => {
    const {i18n} = useLingui();
    const anchor = useComboboxAnchor();
    const [tags, setTags] = useState<string[]>([]);
    const label = (tag: string) => {
        const message = options[tag];
        return message ? i18n._(message) : tag;
    };

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
                {(tag: string) => <ComboboxItem key={tag} value={tag}>{label(tag)}</ComboboxItem>}
            </ComboboxList>
        </ComboboxContent>
    </Combobox>;
};