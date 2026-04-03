import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {Button} from "@/components/ui/button.tsx";
import veni from "@/assets/veni.webp";

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
                        <DialogTitle className="text-xl">Join via Veni!</DialogTitle>
                    </div>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-[1.2fr_auto_0.8fr] gap-8">
                    <div className="flex flex-col gap-4">
                        <p className="text-sm text-muted-foreground">The easiest way to get your venue listed is through
                            <span className="text-foreground font-bold"> Veni Ki</span> <span aria-hidden="true">🥰</span> - our cute bot for managing your venue!
                        </p>

                        <ol className="list-decimal list-inside flex flex-col gap-4 text-sm text-muted-foreground">
                            <li>
                                Veni's home; the FFXIV Venues Discord!
                                <div className="mt-2">
                                    <Button variant="outline" size="sm" render={<a href="https://discord.gg/gTP65VYcMj" rel="noopener noreferrer" target="_blank" />}>
                                        Join the discord!
                                    </Button>
                                </div>
                            </li>
                            <li>
                                <span>Then simply DM Veni and ask to </span>
                                <span className="text-foreground font-bold">Create a venue</span>
                                <span> or type </span>
                                <code className="text-xs bg-muted px-1 py-0.5 rounded">/create</code>!
                                <div className="mt-2">
                                    <Button variant="outline" size="sm" render={<a href="https://discordapp.com/users/906248123951775774" rel="noopener noreferrer" target="_blank" />}>
                                        Meet Veni Ki!
                                    </Button>
                                </div>
                            </li>
                        </ol>
                    </div>

                    <Separator orientation="vertical" className="hidden md:block" />

                    <div className="flex flex-col gap-4 text-sm text-muted-foreground">
                        <p>
                            To keep your venue indexed, we ask that you stay in the FFXIV Venues Discord - it's how Veni stays in touch with you.
                            Don't worry, the server will never notify you unless you subscribe to a topic, and Veni will DM you regularly to keep things up to date. <span aria-hidden="true">🥰</span>
                        </p>
                        <p>
                            If you have any questions or need help, just make a <a href="https://discord.com/channels/942536163959406632/1188579990271434883" rel="noopener noreferrer" target="_blank" className="text-primary underline underline-offset-4">Venue Ticket</a> in the discord.
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}