/*
    allows choosing video source, from filesystem or url
*/

import { useEffect, useState } from "react";
import SimpleTextInput from "../text_input/SimpleTextInput";

import { VideoSourceModel } from "./VideoSourceSelector";

// the block inside the row editor component
// model is passed down containing data (must be jsonified with .toJSON() first)
// onChangeSource called when the source modal selection is complete
/*
    onChangeSource
    (newSrcVal) => {
        ...
    }
    newSrcVal
    {
        source: string,
        type: VideoSourceModel.SourceTypes enum
    }
*/
const VideoSourceEditor = ({videoSourceModel, onChangeSource}) => {

    // calculates if textinput should be enabled
    const shouldEnableLocationTextInput = () => {
        return videoSourceModel.type == VideoSourceModel.SourceTypes.URL;
    };


    const [enableLocationTextInput, setEnableLocationTextInput] = useState(shouldEnableLocationTextInput());
    
    /*
        behaviour of edit button depends on selected source type
        if its a url, edit will enable the simpletextinput
    */
    const onEdit = () => {

        alert("edit");

    };

    /*
        when a new source type is selected, use onChangeSource to change source type
    */
    const onChangeSourceType = (evt) => {
        const selectedType = evt.target.value;
        console.log(`new source type ${selectedType}`);

        onChangeSource({
            source: "unspecified",
            type: selectedType
        });
    };

    // on update
    useEffect(()=>{
        // update enable/disable text input
        setEnableLocationTextInput(shouldEnableLocationTextInput());
    }, [videoSourceModel]);

    return (
        <div className="basicborder" id="sourceEditorBlock">
            <div id="sourceLocationContainer">
                <SimpleTextInput
                    text={videoSourceModel.source}
                    enable={enableLocationTextInput}
                />
            </div>

            <div
                id="editSourceContainer"
            >
                <select value={videoSourceModel.type} onChange={onChangeSourceType}>
                    <option value={VideoSourceModel.SourceTypes.FILE}>File</option>
                    <option value={VideoSourceModel.SourceTypes.URL}>URL</option>
                    <option value={VideoSourceModel.SourceTypes.CAMERA}>Camera</option>
                </select>

                <button onClick={onEdit}>
                    Edit
                </button>

            </div>

        </div>
    );
};



export default VideoSourceEditor;