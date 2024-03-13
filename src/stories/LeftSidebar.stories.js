import LeftSidebar from "../components/left_sidebar/LeftSidebar";

export default {
  title: "LeftSidebar",
  component: LeftSidebar,
};

const Template = (args) => <LeftSidebar {...args} />;

export const Test1 = Template.bind({});
Test1.args = {};
