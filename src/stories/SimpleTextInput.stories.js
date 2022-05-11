
import React from "react";
import SimpleTextInput from "../components/text_input/SimpleTextInput";

export default {
    title: "SimpleTextInput",
    component: SimpleTextInput
};

const Template = (args) => <SimpleTextInput {...args}></SimpleTextInput>;

export const Test1 = Template.bind({});
Test1.args = {
    
};