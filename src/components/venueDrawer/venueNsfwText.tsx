import {cn} from "@/lib/utils";

export const VenueNsfwText = ({hasCourts, openlyNsfw, className}: {
  hasCourts: boolean,
  openlyNsfw: boolean,
  className: string
}) =>
  <>
    {hasCourts && openlyNsfw &&
      <p className={cn("py-3 px-4 bg-muted rounded-md", className)}><strong>Warning:</strong> This venue has indicated
        they are openly NSFW and offer adult services. You must not visit this venue if you are under 18 years of age or
        the legal age of consent in your country, and by visiting you declare you are not. Be prepared to verify your
        age.</p>
    }
    {hasCourts && !openlyNsfw &&
      <p className={cn("py-3 px-4 bg-muted rounded-md", className)}><strong>Warning:</strong> This venue has indicated
        they offer adult services. You must not partake in these services if you are under 18 years of age or the legal
        age of consent in your country, and by partaking in these services you declare you are not. Be prepared to
        verify your age.</p>
    }
    {!hasCourts && openlyNsfw &&
      <p className={cn("py-3 px-4 bg-muted rounded-md", className)}><strong>Warning:</strong> This venue has indicated
        they are openly NSFW. You must not visit this venue if you are under 18 years of age or the legal age of consent
        in your country, and by visiting you declare you are not. Be prepared to verify your age.</p>
    }
  </>