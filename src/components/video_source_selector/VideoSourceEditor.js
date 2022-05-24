/*
    allows choosing video source, from filesystem or url
*/

import { useEffect, useState } from "react";
import ArrayOptionSelect from "../array_option_select/ArrayOptionSelect";
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
    
    const onEdit = () => {

        switch(videoSourceModel.type) {
            // open file browser
            case VideoSourceModel.SourceTypes.FILE:
                console.log("opening file system...");
                break;
            // open device camera select
            case VideoSourceModel.SourceTypes.CAMERA:
                console.log("opening live camera feed selection...");
                break;
            default:
                return;
        }

    };*/

    /*
        when a new source type is selected, use onChangeSource to change source type
    */
    const onChangeSourceType = (evt) => {
        const selectedType = evt.target.value;
        console.log(`changed source type to ${selectedType}`);

        onChangeSource({
            source: "unspecified", // changes source as well
            type: selectedType
        });
    };

    // changing text for url
    const onChangeURLText = (evt) => {
        onChangeSource({
            type:videoSourceModel.type,
            source:evt.target.value
        });
    };

    // when video source model changes
    useEffect(()=>{
        // update enable/disable text input
        setEnableLocationTextInput(shouldEnableLocationTextInput());

        // source type changed, fetch and set video list
        /*
        if (videoSourceModel.type == VideoSourceModel.SourceTypes.FILE) {
            // TODO
        }*/
    }, [videoSourceModel]);

    // render the proper source input
    const GetSourceInputComponent = () => {

        //console.log(`input component changes, current type is ${videoSourceModel.type}`);
        
        if (videoSourceModel.type == VideoSourceModel.SourceTypes.URL) {
            //console.log("showing url sourcetype input");
            return (
                <SimpleTextInput
                    text={videoSourceModel.source}
                    enable={enableLocationTextInput}
                    style={{
                        borderRadius:"0px"
                    }}
                    onChange={
                        onChangeURLText
                    }
                />
            );
        } else {
            return <div></div>
        }
    };

    return (
        <div id="sourceEditorBlock">
            <div id="sourceLocationContainer">

                {GetSourceInputComponent()}

            </div>

            <div
                id="editSourceContainer"
            >
                <select
                    value={videoSourceModel.type}
                    onChange={onChangeSourceType}
                    
                >
                    <option value={VideoSourceModel.SourceTypes.FILE}>File</option>
                    <option value={VideoSourceModel.SourceTypes.URL}>URL</option>
                    <option value={VideoSourceModel.SourceTypes.CAMERA}>Camera</option>
                </select>

                {/*
                    !enableLocationTextInput ? (
                        <button onClick={onEdit} style={{width:"100%"}}>
                            Edit
                        </button>
                    ) : null
                */}

            </div>

        </div>
    );
};



export default VideoSourceEditor;