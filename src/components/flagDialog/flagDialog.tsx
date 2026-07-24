import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/shadcn/dialog.tsx";
import React, {type ChangeEvent, type RefObject, useCallback, useState} from "react";
import {Combobox, ComboboxContent, ComboboxInput, ComboboxItem, ComboboxList} from "@/components/ui/shadcn/combobox.tsx";
import {Button} from "@/components/ui/shadcn/button.tsx";
import {Textarea} from "@/components/ui/shadcn/textarea.tsx";
import {FlagCategory, flagService} from "@/lib/services/flagging/flagService.tsx";
import type {Venue} from "@/lib/model/venue.ts";
import {Spinner} from "@/components/ui/shadcn/spinner.tsx";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/shadcn/alert.tsx";
import {CheckCircle2Icon} from "lucide-react";
import {Trans, useLingui} from "@lingui/react/macro";

type FlagDialogProps = {
    venue: Venue;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    dialogContainer?: RefObject<HTMLDivElement | null>;
};

export const FlagDialog = ({ venue, open, onOpenChange, dialogContainer }: FlagDialogProps) => {

  const [flagSending, setFlagSending] = useState(false);
  const [flagSent, setFlagSent] = useState(false);

  const selectedReason = React.useRef<FlagCategory | undefined>(undefined);
  const additionalDetail = React.useRef<string | undefined>(undefined);


  const submit = useCallback(async () => {
    try {
      if (!selectedReason.current)
        return;

      setFlagSending(true);
      await flagService.flagVenue(venue.id, selectedReason.current, additionalDetail.current);
      setFlagSending(false);
      setFlagSent(true);
    } catch (e) {
      setFlagSending(false);
    }
  }, [ flagService, venue.id, selectedReason, additionalDetail ])

  return (
      <Dialog open={open} onOpenChange={onOpenChange} modal={true}>
          <DialogContent container={dialogContainer} className="p-5" showCloseButton={false}>
              <DialogHeader>
                <DialogTitle className="text-base leading-none font-bold"><Trans>Flag venue</Trans></DialogTitle>
                <DialogDescription><Trans>Flag a venue to the team for review.</Trans></DialogDescription>
              </DialogHeader>

            { !flagSent && <FlagForm additionalDetail={additionalDetail} selectedReason={selectedReason} /> }
            { flagSent && <FlagSubmittedNotice /> }

            <DialogFooter className="-m-5 mt-0 rounded-b-lg bg-muted/50 p-5 border-t flex justify-between!">
              <DialogClose render={
                <Button type="button" variant="outline" className="p-4.5">
                  <Trans>Close</Trans>
                </Button>
              } />
              { flagSending && <Spinner className="mt-3 mx-6 h-4 w-4 animate-spin" />}
              { !flagSending && !flagSent && <Button type="button" variant="destructive" className="p-4.5" onClick={submit}><Trans>Submit</Trans></Button> }
            </DialogFooter>
          </DialogContent>
      </Dialog>
    );
};

const FlagForm = ({
  selectedReason,
  additionalDetail
} : {
  selectedReason: RefObject<FlagCategory | undefined>,
  additionalDetail: RefObject<string | undefined>
}) => {

  const setSelectedReason =
    useCallback((value: { value: FlagCategory } | null) => selectedReason.current = value?.value, [ selectedReason ]);
  const setAdditionalDetail =
    useCallback((e: ChangeEvent<HTMLTextAreaElement>) => additionalDetail.current = e.target.value, [ additionalDetail ]);
  const { t } = useLingui();

  return <>
    <Combobox onValueChange={setSelectedReason}>
      <ComboboxInput placeholder={t`Select reason`} aria-label={t`Select reason`} triggerAriaLabel={t`Select reason`}/>
      <ComboboxContent>
        <ComboboxList>
          <ComboboxItem value={{ label: t`Venue empty`, value: "VenueEmpty" }}>
            <Trans>Venue empty</Trans>
          </ComboboxItem>
          <ComboboxItem value={{ label: t`Incorrect information`, value: "IncorrectInformation" }}>
            <Trans>Incorrect information</Trans>
          </ComboboxItem>
          <ComboboxItem value={{ label: t`Inappropriate content`, value: "InappropriateContent" }}>
            <Trans>Inappropriate content</Trans>
          </ComboboxItem>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
    <Textarea placeholder={t`Additional details`} onChange={setAdditionalDetail} />
  </>
}

const FlagSubmittedNotice = () => <Alert>
  <CheckCircle2Icon />
  <AlertTitle><Trans>Flag accepted</Trans></AlertTitle>
  <AlertDescription>
    <Trans>Your flag has been submitted for review. The team usually actions flags within 24 hours.</Trans>
  </AlertDescription>
</Alert>

