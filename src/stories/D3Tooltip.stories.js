
import D3Tooltip from "../components/d3_tooltip/D3Tooltip";

export default {
    title: "D3Tooltip",
    component: D3Tooltip
};

const Template = (args) => <D3Tooltip {...args}/>;

export const Test1 = Template.bind({});
Test1.args = {
    data : [
        {count : 5, data: "Loitering event"},
        {count : 24, data: "Boundary crossing"},
        {count : 13, data: "Boundary crossing"},
        {count : 7, data: "Abandoned package"},
        {count : 999, data: "Camera event"}
    ]
};