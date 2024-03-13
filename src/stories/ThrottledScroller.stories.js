import ThrottledScroller from "../components/throttled_scroller/ThrottledScroller";

export default {
  title: "ThrottledScroller",
  component: ThrottledScroller,
};

const Template = (args) => <ThrottledScroller {...args} />;

export const Test1 = Template.bind({});
Test1.args = {};
