import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/shadcn/dialog.tsx";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/shadcn/avatar.tsx";
import { Separator } from "@/components/ui/shadcn/separator.tsx";
import {Button} from "@/components/ui/shadcn/button.tsx";
import veni from "@/assets/veni.webp";
import {A} from "@/components/ui/a.tsx";
import {Trans} from "@lingui/react/macro";

type CreateVenueDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export const CreateVenueDialog = ({ open, onOpenChange } : CreateVenueDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src={veni} alt="Veni Ki" />
                            <AvatarFallback>VK</AvatarFallback>
                        </Avatar>
                        <DialogTitle className="text-xl"><Trans comment="Veni / Veni Ki is the FFXIV Venues Discord bot; keep the name as-is">Join via Veni!</Trans></DialogTitle>
                    </div>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-[1.2fr_auto_0.8fr] gap-8">
                    <div className="flex flex-col gap-4">
                        <p className="text-sm text-muted-foreground">
                            <Trans comment="Veni / Veni Ki is the FFXIV Venues Discord bot; keep the name as-is">The easiest way to get your venue listed is through <span className="text-foreground font-bold">Veni Ki</span> <span aria-hidden="true">🥰</span> - our cute bot for managing your venue!</Trans>
                        </p>

                        <ol className="list-decimal list-inside flex flex-col gap-4 text-sm text-muted-foreground">
                            <li>
                                <Trans comment="Veni / Veni Ki is the FFXIV Venues Discord bot; keep the name as-is">Join Veni's home; the FFXIV Venues Discord!</Trans>
                                <div className="mt-2">
                                    <Button nativeButton={false} variant="outline" size="sm" render={<a href="https://discord.gg/gTP65VYcMj" rel="noopener noreferrer" target="_blank" />}>
                                        <Trans>Join the discord!</Trans>
                                    </Button>
                                </div>
                            </li>
                            <li>
                                <Trans>Then simply DM Veni and ask to <span className="text-foreground font-bold">Create a venue</span> or type <code className="text-xs bg-muted px-1 py-0.5 rounded">/create</code>!</Trans>
                                <div className="mt-2">
                                    <Button nativeButton={false} variant="outline" size="sm" render={<a href="https://discordapp.com/users/906248123951775774" rel="noopener noreferrer" target="_blank" />}>
                                        <Trans comment="Veni / Veni Ki is the FFXIV Venues Discord bot; keep the name as-is">Meet Veni Ki!</Trans>
                                    </Button>
                                </div>
                            </li>
                        </ol>
                    </div>

                    <Separator orientation="vertical" className="hidden md:block" />

                    <div className="flex flex-col gap-4 text-sm text-muted-foreground">
                        <p>
                            <Trans comment="Veni / Veni Ki is the FFXIV Venues Discord bot; keep the name as-is">
                                To keep your venue indexed, we ask that you stay in the FFXIV Venues Discord - it's how Veni stays in touch with you.
                                Don't worry, the server will never notify you unless you subscribe to a topic, and Veni will DM you regularly to keep things up to date. <span aria-hidden="true">🥰</span>
                            </Trans>
                        </p>
                        <p>
                            <Trans>
                                If you have any questions or need help, just make a <a href="https://discord.com/channels/942536163959406632/1188579990271434883" rel="noopener noreferrer" target="_blank" className="text-primary underline underline-offset-4">Venue Ticket</a> in the discord.
                            </Trans>
                        </p>
                    </div>
                </div>
                <p className="text-xs text-muted-foreground">
                    <Trans>Subject to <A href="https://ffxivvenues.com/privacy">privacy policy</A></Trans>
                </p>
            </DialogContent>
        </Dialog>
    );
}