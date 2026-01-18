import {Card, Flex, Group, Image, Indicator, ScrollArea, Text, Title} from "@mantine/core";
import image from "@/assets/default-banner.jpg";
import type {ScheduleItem} from "@/services/venues/venueService.ts";
import {House} from "phosphor-react";

export function ScheduleRow(props: { title: string, venues: ScheduleItem[] }) {
    {/*<SimpleGrid cols={{ base: 1, xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }} spacing="xl">*/}
  return <Flex gap={"xl"}>
    <style>
      {`
        @keyframes pulse {
          0% { box-shadow: 0 0 4px 1px var(--indicator-color); }
          50% { box-shadow: 0 0 8px 3px var(--indicator-color); }
          100% { box-shadow: 0 0 4px 1px var(--indicator-color); }
        }
      `}
    </style>
    <Title order={3} style={{writingMode: 'sideways-lr', textAlign: 'right', lineHeight: '.7em', color: "magenta"}}>
      <Indicator /> {props.title}
    </Title>
    <ScrollArea h={"auto"}>
      <Group align="center" gap="xl" w="max-content">
        {props.venues.map((scheduleItem) =>
          <Card
            bg="transparent"
            padding="lg"
            radius="md"
            w={350}
            display={"inline-block"}
          >
            <Card.Section>
              <Image radius="md" src={scheduleItem.venue.bannerUri || image} height={160} />
            </Card.Section>

            <Flex justify="space-between" mt="md" mb="xs">
              <Text lineClamp={1} fw={500}>{scheduleItem.venue.name}</Text>
              {scheduleItem.venue.resolution?.isNow &&
                <Indicator color="magenta" size={8} position="middle-start" offset={-15}
                           styles={{
                             indicator: {
                               marginTop: -2,
                               boxShadow: '0 0 6px 2px #FF00FF',
                               animation: 'pulse 1.5s infinite',
                             },
                           }}
                >
                  <Text size="sm" w={"max-content"}>Open now</Text>
                </Indicator>
              }
            </Flex>

            {/*<Flex columnGap="xs" align="center" >*/}
            {/*  <House weight="fill" size={16} />*/}
              <Text lineClamp={1} size="sm" c="dimmed">
                {scheduleItem.venue.location.toString(true)}
              </Text>
            {/*</Flex>*/}
          </Card>
        )}

      </Group>
    </ScrollArea>

    {/*</SimpleGrid>*/}
  </Flex>
}