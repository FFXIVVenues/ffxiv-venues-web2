import {Badge} from "@/components/ui/shadcn/badge.tsx";
import {cn} from "@/lib/utils";

export const VenueTags = ({tags, className }: { tags: string[], className?: string }) =>
  <div className={cn("flex flex-wrap gap-2", className)}>
    {tags && tags.length &&
      tags.map((tag, i) =>
        <Badge variant="secondary" className="p-3 text-md rounded-sm" key={i}>{tag}</Badge>
      )}
  </div>