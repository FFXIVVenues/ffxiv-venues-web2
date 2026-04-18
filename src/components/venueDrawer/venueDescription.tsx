import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const VenueDescription = ({description}: { description: string[] }) =>
  description && description.length > 0 &&
  <article className="select-text mt-6 prose text-muted-foreground leading-inherit text-sm
   prose-strong:text-muted-foreground prose-p:text-muted-foreground
   prose-h1:text-muted-foreground prose-h1:uppercase prose-h1:tracking-wide prose-h1:text-[1.2em] prose-h1:my-4
   prose-h2:text-muted-foreground prose-h2:uppercase prose-h2:tracking-wide prose-h2:text-[1em] prose-h2:my-3
   prose-h3:text-muted-foreground prose-h3:tracking-wide prose-h3:text-[1em] prose-h3:my-0
   prose-a:text-muted-foreground prose-a:hover:text-foreground prose-a:underline">
    <Markdown remarkPlugins={[remarkGfm]}>{description.join("\n\n")}</Markdown>
  </article>