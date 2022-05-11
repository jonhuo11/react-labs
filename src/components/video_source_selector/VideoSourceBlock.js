/*
    a single row within the selector
*/

import SimpleTextInput from "../text_input/SimpleTextInput";
import { useEffect } from "react";
import { VideoSourceModel } from "./VideoSourceSelector";


const VideoSourceBlock = ({
    videoSourceModel,
    onChangeName,
    onChangeLocation,
    onDelete
}) => {

    // for logging/debugging purposes
    useEffect(()=>{
        //console.log(videoSourceModel.id, " sourceModel changed");
    }, [videoSourceModel]);

    const onChangeLocationCb = (e) => {
        onChangeLocation(e.target.value, videoSourceModel.id);
    }

    const onChangeNameCb = (e) => {
        //console.log(e.target.value);
        onChangeName(e.target.value, videoSourceModel.id);
    };

    const onDeleteCb = () => {
        onDelete(videoSourceModel.id);
    };

    return (
        <div className="videoSourceBlock">

            <div className="basicborder subblock">
                <SimpleTextInput
                    text={videoSourceModel.name}
                    onChange={onChangeNameCb}
                />
            </div>

            <div className="basicborder subblock">
            <SimpleTextInput
                    text={videoSourceModel.location}
                    onChange={onChangeLocationCb}
                />
            </div>

            <div className="basicborder subblock">
                <p>source WIP</p>
            </div>

            <div className="basicborder">
                <button onClick={onDeleteCb}>delete</button>
            </div>

        </div>
    );
};


export default VideoSourceBlock;