import type {Nullable} from "@/lib/utils/nullable.ts";
import {Button} from "@/components/ui/button.tsx";
import {DiscordFillIcon} from "@/components/icons/akar-icons-discord-fill.tsx";

export const VenueDiscordButton = ({discordLink}: { discordLink: Nullable<string> }) =>
  discordLink &&
  <Button nativeButton={false} className="cursor-pointer flex items-center h-10 px-4 gap-2 font-bold grow" render={(props) =>
    <a href={discordLink} target="_blank" rel="noopener noreferrer" {...props}>
      <DiscordFillIcon className="size-5" stroke="var(--color-primary-foreground)"
                       fill="var(--color-primary-foreground)"/> Discord
    </a>
  }/>