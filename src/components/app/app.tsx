import { useVenueSchedule } from '@/services/venues/useVenueSchedule.ts';
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {Item, ItemContent, ItemMedia, ItemTitle} from "@/components/ui/item.tsx";
import {Spinner} from "@/components/ui/spinner.tsx";

export function App() {
  const [ venues, error, setFilters ] = useVenueSchedule([]);

    return <main style={{color: 'var(--destructive-foreground)' }}>
        <Item variant="muted" className="m-auto max-w-xs my-6 rounded-md">
          <ItemMedia>
            <Spinner />
          </ItemMedia>
          <ItemContent className="line-clamp-1 grow">
            <ItemTitle>Fetching venues...</ItemTitle>
          </ItemContent>
        </Item>

        <section className="grid grid-cols-3 grid-flow-row gap-12 w-4/5 m-auto ">
          <Skeleton className="aspect-square w-full rounded-2xl bg-muted/50" />
          <Skeleton className="aspect-square w-full rounded-2xl bg-muted/50" />
          <Skeleton className="aspect-square w-full rounded-2xl bg-muted/50" />
          <Skeleton className="aspect-square w-full rounded-2xl bg-muted/50" />
          <Skeleton className="aspect-square w-full rounded-2xl bg-muted/50" />
        </section>
    </main>

  return (
   <>
     <Button>Click me</Button>
     <Button variant="destructive">Click me</Button>
   </>
  )
}
