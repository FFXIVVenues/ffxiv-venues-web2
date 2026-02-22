import {Card, Flex, Group, Image, Indicator, ScrollArea, Text, Title} from "@mantine/core";
import type {ScheduleItem} from "@/services/venues/venueService.ts";
import {VenueCard} from "@/components/venueCard/venueCard.tsx";

export function ScheduleRow(props: { title: string, venues: ScheduleItem[] }) {
    {/*<SimpleGrid cols={{ base: 1, xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }} spacing="xl">*/}
  return <Flex gap={"xl"}>

    <Title order={3} style={{writingMode: 'sideways-lr', textAlign: 'right', lineHeight: '.7em'}}>
      {props.title}
    </Title>
    <ScrollArea h={"auto"}>
      <Group align="center" gap="xl" w="max-content">
        {props.venues.map((scheduleItem : ScheduleItem) => <VenueCard scheduleItem={scheduleItem} />)}
      </Group>
    </ScrollArea>

    {/*</SimpleGrid>*/}
  </Flex>
}