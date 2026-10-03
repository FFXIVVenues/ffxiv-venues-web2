import type {ReactNode} from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/shadcn/avatar.tsx";
import veni from "@/assets/veni.webp";

export const VeniHeader = ({title, subtitle}: {title: ReactNode; subtitle: ReactNode}) =>
    <div className="flex items-center gap-3 mb-8">
        <Avatar>
            <AvatarImage src={veni} alt="Veni Ki" />
            <AvatarFallback>VK</AvatarFallback>
        </Avatar>
        <div>
            <h1 className="text-xl font-medium">{title}</h1>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
    </div>;
