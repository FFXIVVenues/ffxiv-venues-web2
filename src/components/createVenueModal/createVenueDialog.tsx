import {
    Dialog,
    DialogContent, DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {buttonVariants} from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import veni from "@/assets/veni.webp";

type createVenueDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export const CreateVenueDialog = ({ open, onOpenChange } : createVenueDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-4xl">
                <DialogHeader>
                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src={veni} alt="Veni Ki" />
                            <AvatarFallback>VK</AvatarFallback>
                        </Avatar>
                        <DialogTitle className="text-xl">Join via Veni!</DialogTitle>
                    </div>
                </DialogHeader>
                <DialogDescription className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8">
                    <div className="flex flex-col gap-4">
                        <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            <span className="text-foreground font-bold"> Veni Ki</span>, sed do eiusmod tempor incididunt.
                        </p>

                        <ol className="list-decimal list-inside flex flex-col gap-4 text-sm text-muted-foreground">
                            <li>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit!
                                <div className="mt-2">
                                    <a href="https://discord.gg/gTP65VYcMj" className={buttonVariants({ variant: "outline", size: "sm" })}>Join the discord!</a>
                                </div>
                            </li>
                            <li>
                                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit </span>
                                <span className="text-foreground font-bold">Create a venue</span>
                                <span> or type </span>
                                <code className="text-xs bg-muted px-1 py-0.5 rounded">/create</code>!
                                <div className="mt-2">
                                    <a href="https://discordapp.com/users/906248123951775774" className={buttonVariants({ variant: "outline", size: "sm" })}>Lorem ipsum dolor!</a>
                                </div>
                            </li>
                        </ol>
                    </div>

                    <Separator orientation="vertical" className="hidden md:block" />

                    <div className="flex flex-col gap-4 text-sm text-muted-foreground">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna {" "}
                            <a href="https://discordapp.com/users/236852510688542720" className="text-primary underline underline-offset-4">Kana Ki</a>.
                        </p>
                    </div>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
}