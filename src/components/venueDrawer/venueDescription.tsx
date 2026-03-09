import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const VenueDescription = ({description}: { description: string[] }) =>
  description && description.length > 0 &&
  <article className="mt-8">
    <Markdown remarkPlugins={[remarkGfm]}>{description.join("\n\n")}</Markdown>
  </article>