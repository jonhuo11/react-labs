/*
    allows choosing video source, from filesystem or url
*/

import { useState } from "react";
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

    // if textinput is enabled, the sourceProvider becomes the textinput
    // otherwise sourceProvider can be the file system or something
    // source changes live wont affect watchman-server since there is big submit form button later
    const [sourceProvider, setSourceProvider] = useState(videoSourceModel.source);

    const [enableLocationTextInput, setEnableLocationTextInput] = useState(shouldEnableLocationTextInput());
    
    /*
        behaviour of edit button depends on selected source type
        if its a url, edit will enable the simpletextinput
    */
    const onEdit = () => {
        // first update the state in videosourceselector
        onChangeSource({
            source: sourc
        });
    };
    // calculates if textinput should be enabled
    const shouldEnableLocationTextInput = () => {
        return videoSourceModel.type == videoSourceModel.type.URL;
    };

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
                <select value={videoSourceModel.type} onChange={onChangeSource}>
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