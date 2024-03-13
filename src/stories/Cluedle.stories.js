import { Cluedle } from "../containers/cluedle/Cluedle";

export default {
  title: "Cluedle",
  component: Cluedle,
};

const Template = (args) => <Cluedle {...args} />;

export const Test1 = Template.bind({});
Test1.args = {};
