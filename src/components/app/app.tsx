import { useVenueSchedule } from '@/services/venues/useVenueSchedule.ts';

export function App() {
  const [ venues, error, setFilters ] = useVenueSchedule([]);

  console.log(venues, error, setFilters);

  if (error !== null)
    return (<>{error.message}<br /> {error.stack}</>);

  if (venues === null)
    return (<>Loading...</>);

  return (
    <>
      {venues.open.map(venue => <div key={venue.venue.id}>{venue.venue.id}</div>)}
    </>
  )
}
