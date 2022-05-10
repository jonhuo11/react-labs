import React from "react";
import { VideoSourceSelector } from "../components/video_source_selector/VideoSourceSelector";

export default {
    title: "VideoSourceSelector",
    component: VideoSourceSelector
};

const Template = (args) => <VideoSourceSelector {...args}/>;

export const Test1 = Template.bind({});
Test1.args = {
    parsedNodeConfig: {
        sources: {

        }
    }
};