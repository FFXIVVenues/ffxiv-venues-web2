import type {MessageDescriptor} from "@lingui/core";
import {Trans, useLingui} from "@lingui/react/macro";
import {
    Combobox,
    ComboboxChip,
    ComboboxChips,
    ComboboxChipsInput,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxItem,
    ComboboxList,
    ComboboxValue,
    useComboboxAnchor
} from "@/components/ui/shadcn/combobox.tsx";

export const TagPicker = ({options, descriptions, max, placeholder, value, onChange}: {
    options: Record<string, MessageDescriptor>;
    descriptions?: Record<string, MessageDescriptor>;
    max?: number;
    placeholder: string;
    value: string[];
    onChange: (tags: string[]) => void;
}) => {
    const {i18n} = useLingui();
    const anchor = useComboboxAnchor();
    const selected = value.filter(tag => tag in options);
    const choose = (picked: string[]) => onChange([...value.filter(tag => !(tag in options)), ...(max ? picked.slice(0, max) : picked)]);
    const label = (tag: string) => i18n._(options[tag]!);

    return <Combobox multiple items={Object.keys(options)} itemToStringLabel={label} value={selected} onValueChange={choose}>
        <ComboboxChips ref={anchor}>
            <ComboboxValue>
               {(chips: string[]) => <>
                   {chips.map(tag => <ComboboxChip key={tag}>{label(tag)}</ComboboxChip>)}
                   <ComboboxChipsInput placeholder={chips.length ? "" : placeholder} />
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