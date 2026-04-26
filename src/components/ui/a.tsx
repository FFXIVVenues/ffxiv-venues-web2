import React, {type ReactNode} from "react";

export const A = ({ href, children }: { href: string, children: ReactNode }) => (
    <a href={href} className="underline underline-offset-2 hover:opacity-70 transition-opacity" target="_blank" rel="noopener noreferrer">

        {children}
    </a>
);