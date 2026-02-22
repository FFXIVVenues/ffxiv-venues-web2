import {Card, Flex, Indicator, Text, Image } from "@mantine/core"
import type {ScheduleItem} from "@/services/venues/venueService.ts"
import defaultImage from "@/assets/default-banner.jpg";
import {DateText} from "@/components/dateString/dateText.tsx";
import {TimeText} from "@/components/dateString/timeText.tsx";


export function VenueCard({ scheduleItem } : { scheduleItem: ScheduleItem }) {
  const openingResolution = scheduleItem.opening ||  scheduleItem.venue.resolution;

  return <>
    <style>
      {`
        @keyframes pulse {
          0% { box-shadow: 0 0 4px 1px var(--indicator-color); }
          50% { box-shadow: 0 0 8px 3px var(--indicator-color); }
          100% { box-shadow: 0 0 4px 1px var(--indicator-color); }
        }
      `}
    </style>

    <Card
      bg="transparent"
      padding="lg"
      radius="md"
      w={350}
      display={"inline-block"}
    >
      <Card.Section>
        <Image radius="md" src={scheduleItem.venue.bannerUri || defaultImage} height={160} />
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
        {openingResolution && (
          <>
            <div className="venue-card__date"><DateText date={openingResolution.start}/></div>
            <div className="venue-card__start"><TimeText date={openingResolution.start} format24={false}/></div>
            <div className="venue-card__time-split">-</div>
            <div className="venue-card__end"><TimeText date={openingResolution.end} format24={false}/></div>
          </>
        )}
      </Text>
    {/*</Flex>*/}
    </Card>
  </>
}