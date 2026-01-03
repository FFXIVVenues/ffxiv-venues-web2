import { useVenueSchedule } from './services/venues/useVenueSchedule';

function App() {
  const [ venues, error, setFilters ] = useVenueSchedule([]);

  console.log(venues, error, setFilters);

  return (
    <>
      Hello World

    </>
  )
}

export default App
