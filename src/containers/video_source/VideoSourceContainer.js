import {VideoSourceSelector} from "../../components/video_source_selector/VideoSourceSelector";

const VideoSourceContainer = () => {

    return (
        <div>
            <VideoSourceSelector
                parsedNodeConfig={{
                    sources: {}
                }}
            />
        </div>
    );
};

export default VideoSourceContainer;