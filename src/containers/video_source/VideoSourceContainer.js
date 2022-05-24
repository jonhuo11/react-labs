import {useEffect, useState} from "react";

import ArrayOptionSelect from "../../components/array_option_select/ArrayOptionSelect";
import {VideoSourceSelector} from "../../components/video_source_selector/VideoSourceSelector";

const VideoSourceContainer = () => {

    const [chosen, setChosen] = useState("a");

    useEffect(() => {
        console.log(chosen);
    }, [chosen]);

    return (
        <div>
            <ArrayOptionSelect
                optionsArray={["a","b","c"]}
                chosen={chosen}
                onChange={(newChoice)=>{
                    setChosen(newChoice);
                }}
            ></ArrayOptionSelect>

            <div style={{height:"50px"}}></div>

            <VideoSourceSelector
                parsedNodeConfig={{
                    sources: {}
                }}
            />
        </div>
    );
};

export default VideoSourceContainer;