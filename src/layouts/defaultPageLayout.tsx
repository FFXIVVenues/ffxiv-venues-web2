import {Children, type FC, isValidElement, type ReactElement, type ReactHTMLElement, type ReactNode} from "react";

type DefaultLayoutProps = {
    children: ReactNode;
    className?: string;
};

type CompoundComponent<P = {}> = FC<P> & {
    Panel: FC<{ children: ReactNode }>;
    Page: FC<{ children: ReactNode }>;
};

export const DefaultPageLayout: CompoundComponent<DefaultLayoutProps> = ({ children, className }) => {
    const compounds = Children.toArray(children);
    const panelContent = compounds.find(
        (c): c is ReactElement => isValidElement(c) && c.type === DefaultPageLayout.Panel
    );
    const pageContent = compounds.find(
        (c): c is ReactElement => isValidElement(c) && c.type === DefaultPageLayout.Page
    );

    return <>
        {panelContent}
        {pageContent}
    </>
}

DefaultPageLayout.Panel = ({ children }) => <>{children}</>;
DefaultPageLayout.Page = ({ children }) => <>{children}</>;