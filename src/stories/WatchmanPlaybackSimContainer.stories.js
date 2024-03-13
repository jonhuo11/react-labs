import { EventTooltipEvents } from "../components/event_tooltip/EventTooltip";
import WatchmanPlaybackSimContainer from "../containers/watchman_playback_sim/WatchmanPlaybackSimContainer";

export default {
  title: "WatchmanPlaybackSimContainer",
  component: WatchmanPlaybackSimContainer,
};

const Template = (args) => <WatchmanPlaybackSimContainer {...args} />;

export const Test1 = Template.bind({});
Test1.args = {
  events: [
    { type: EventTooltipEvents.AbandonedPackage, timestampMs: 20 },
    { type: EventTooltipEvents.BoundaryCrossing, timestampMs: 40 },
    { type: EventTooltipEvents.BoundaryCrossing, timestampMs: 300 },
    { type: EventTooltipEvents.Loitering, timestampMs: 400 },
    { type: EventTooltipEvents.Loitering, timestampMs: 450 },
    { type: EventTooltipEvents.Loitering, timestampMs: 600 },
  ],
};
