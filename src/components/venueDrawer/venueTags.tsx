import {Badge} from "@/components/ui/badge.tsx";

export const VenueTags = ({tags}: { tags: string[] }) =>
  <div className="flex flex-wrap gap-2 my-8">
    {tags && tags.length &&
      tags.map((tag, i) =>
        <Badge variant="secondary" className="p-3 text-md rounded-sm" key={i}>{tag}</Badge>
      )}
  </div>