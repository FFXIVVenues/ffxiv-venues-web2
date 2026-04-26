import React, {memo, type ReactNode} from "react";
import {useInView} from "react-intersection-observer";
import {Skeleton} from "@/components/ui/shadcn/skeleton.tsx";

export const Lazy = memo(({children, className, buffer}: { children: ReactNode, className?: string, buffer?: number }) => {
  const {ref, inView} = useInView({triggerOnce: true, rootMargin: (buffer || 500)+"px"});
  return <div ref={ref}>
    {inView ? children : <Skeleton className={className} />}
  </div>
})