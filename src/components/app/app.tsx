import { useVenueSchedule } from '@/services/venues/useVenueSchedule.ts';
import {AppShell, Burger, Combobox, Group, Space, TextInput, Title} from '@mantine/core';
import { useDisclosure } from "@mantine/hooks";
import days from '@/model/consts/days.json';
import {ScheduleRow} from "@/components/scheduleRow/scheduleRow.tsx";

export function App() {
  const [ opened, { toggle }] = useDisclosure();
  const [ venues, error, setFilters ] = useVenueSchedule([]);
  const spacerHeight = "xl";


  if (!venues) return null;

  return (
    <AppShell
      padding="xl"
      navbar={{
        width: 250,
        breakpoint: 'md',
        collapsed: { mobile: !opened, desktop: !opened }
      }}
    >
      <AppShell.Navbar>
        Cock
      </AppShell.Navbar>

      <AppShell.Main>
        <Group justify="space-between">
          <Burger opened={opened} onClick={toggle} />
          <TextInput autoFocus w={300} aria-label="Search venues" placeholder={"Search..."} />
        </Group>

        <Space h={spacerHeight}/>

        { !!venues.open?.length &&
          <ScheduleRow title="Open now" venues={venues.open} />
        }
        <Space h={spacerHeight}/>
        { !!venues.newest?.length &&
          <ScheduleRow title="Newest" venues={venues.newest} />
        }
        <Space h={spacerHeight}/>
        { !!venues.favourites?.length &&
          <ScheduleRow title="Favorites" venues={venues.favourites} />
        }
        { !!venues.scheduled?.length &&
            venues.scheduled.map((day, i) => <>
              <Space h={spacerHeight}/>
              <ScheduleRow title={days[i]!} venues={day} />
            </>)
        }
        <Space h={spacerHeight}/>
        { !!venues.unscheduled?.length &&
            <ScheduleRow title="Unscheduled" venues={venues.unscheduled} />
        }
      </AppShell.Main>
    </AppShell>
  )
}
