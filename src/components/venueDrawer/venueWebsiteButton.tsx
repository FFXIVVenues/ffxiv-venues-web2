import type {Nullable} from "@/lib/utils/nullable.ts";
import {Button} from "@/components/ui/shadcn/button.tsx";
import {LinkIcon} from "lucide-react";

export const VenueWebsiteButton = ({website}: { website: Nullable<string> }) =>
  website &&
  <Button nativeButton={false} className="cursor-pointer flex items-center h-10 px-4 gap-2 font-bold grow" render={(props) =>
    <a href={website} target="_blank" rel="noopener noreferrer" {...props}>
      <LinkIcon className="size-5" strokeWidth={3} stroke="var(--color-primary-foreground)"/> Website
    </a>
  }/>