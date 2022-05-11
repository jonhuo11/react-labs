/*
    a single row within the selector
*/

import VideoSourceEditor from "./VideoSourceEditor";
import SimpleTextInput from "../text_input/SimpleTextInput";
import { useEffect } from "react";


const VideoSourceRowDisplay = ({
    videoSourceModel,
    onChangeName,
    onChangeLocation,
    onChangeSource,
    onDelete
}) => {

    // for logging/debugging purposes
    useEffect(()=>{
        console.log(videoSourceModel.id, " sourceModel changed");
    }, [videoSourceModel]);

    const onChangeLocationCb = (e) => {
        onChangeLocation(e.target.value, videoSourceModel.id);
    }

    const onChangeNameCb = (e) => {
        //console.log(e.target.value);
        onChangeName(e.target.value, videoSourceModel.id);
    };
    
    const onChangeSourceCb = (newSrcVal) => {
        onChangeSource(newSrcVal, videoSourceModel.id);
    };

    const onDeleteCb = () => {
        onDelete(videoSourceModel.id);
    };

    return (
        <div className="videoSourceBlock">

            <div className="subblock">
                <SimpleTextInput
                    text={videoSourceModel.name}
                    onChange={onChangeNameCb}
                    style={{
                        borderRadius:"0px"
                    }}
                />
            </div>

            <div className="subblock">
                <SimpleTextInput
                    text={videoSourceModel.location}
                    onChange={onChangeLocationCb}
                    style={{
                        borderRadius:"0px"
                    }}
                />
            </div>

            <div className="subblock">
                
                <VideoSourceEditor
                    videoSourceModel={videoSourceModel}
                    onChangeSource={onChangeSourceCb}
                />

            </div>

            <div className="clearborder" style={{
                display:"flex",
                flexDirection:"column",
                alignContent:"center",
                justifyContent:"center"
            }}>
                <button onClick={onDeleteCb}>delete</button>
            </div>

        </div>
    );
};


export default VideoSourceRowDisplay;