
import HLSPlayer from "../components/hls_player/HLSPlayer";

export default {
    title: "HLSPlayer",
    component: HLSPlayer
};

const Template = (args) => <HLSPlayer {...args}/>;

export const Test1 = Template.bind({});
Test1.args = {
    
};