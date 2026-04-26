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
                <DialogTitle className="text-base leading-none font-bold">Flag venue</DialogTitle>
                <DialogDescription>Flag a venue to the team for review.</DialogDescription>
              </DialogHeader>

            { !flagSent && <FlagForm additionalDetail={additionalDetail} selectedReason={selectedReason} /> }
            { flagSent && <FlagSubmittedNotice /> }

            <DialogFooter className="-m-5 mt-0 rounded-b-lg bg-muted/50 p-5 border-t flex justify-between!">
              <DialogClose render={
                <Button type="button" variant="secondary" className="p-4.5">
                  Close
                </Button>
              } />
              { flagSending && <Spinner className="mt-3 mx-6 h-4 w-4 animate-spin" />}
              { !flagSending && !flagSent && <Button type="button" variant="destructive" className="p-4.5" onClick={submit}>Submit</Button> }
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

  return <>
    <Combobox onValueChange={setSelectedReason}>
      <ComboboxInput placeholder="Select reason" aria-label="Select reason" triggerAriaLabel="Select reason"/>
      <ComboboxContent>
        <ComboboxList>
          <ComboboxItem value={{ label: "Venue empty", value: "VenueEmpty" }}>
            Venue empty
          </ComboboxItem>
          <ComboboxItem value={{ label: "Incorrect information", value: "IncorrectInformation" }}>
            Incorrect information
          </ComboboxItem>
          <ComboboxItem value={{ label: "Inappropriate content", value: "InappropriateContent" }}>
            Inappropriate content
          </ComboboxItem>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
    <Textarea placeholder="Additional details" onChange={setAdditionalDetail} />
  </>
}

const FlagSubmittedNotice = () => <Alert>
  <CheckCircle2Icon />
  <AlertTitle>Flag accepted</AlertTitle>
  <AlertDescription>
    Your flag has been submitted for review. The team usually actions flags within 24 hours.
  </AlertDescription>
</Alert>

