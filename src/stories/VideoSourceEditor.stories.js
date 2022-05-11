import React from "react";
import VideoSourceEditor from "../components/video_source_selector/VideoSourceEditor";

export default {
    title: "VideoSourceEditor",
    component: VideoSourceEditor
};

const Template = (args) => <VideoSourceEditor {...args}/>

export const Test1 = Template.bind({});
Test1.args = {

};