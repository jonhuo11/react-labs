import SimpleTimeline from "../components/simple_timeline/SimpleTimeline";

export default {
  title: "SimpleTimeline",
  component: SimpleTimeline,
};

const Template = (args) => <SimpleTimeline {...args} />;

export const Test1 = Template.bind({});
Test1.args = {
  width: 600,
};
