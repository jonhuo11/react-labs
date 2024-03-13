import CalendarPrototype from "../experiments/calenderapp/CalendarPrototype";

export default {
  title: "CalendarPrototype",
  component: CalendarPrototype,
};

const Template = (args) => <CalendarPrototype {...args} />;

export const Test1 = Template.bind({});
Test1.args = {};
