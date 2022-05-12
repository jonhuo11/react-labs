import { useState, useCallback, useEffect} from "react";
import produce from "immer";
import {v4 as uuidv4} from "uuid";
import PropTypes from "prop-types";

import "./index.css";
import VideoSourceRowDisplay from "./VideoSourceRowDisplay";

/*
    videosourcemodel
    {
        name: string,
        location: string,
        source: string
    }
*/
class VideoSourceModel {
    static shortNames = ["alpha", "beta", "charlie", "delta", "echo", "foxtrot","gamma","hotel","india","joker","sigma","zeta","coriander","lettuce","beetroot","pineapple","pear","neptune","jupiter"];

    static SourceTypes = {
        URL: 0,
        FILE: 1,
        CAMERA: 2
    };

    constructor(args) {
        this.id = args.id || undefined;
        this.name = args.name || `new source ${Date.now()} ${VideoSourceModel.shortNames[Math.floor(Math.random() * VideoSourceModel.shortNames.length)]}`;
        this.location = args.location || "unknown location";
        this.type = args.type || VideoSourceModel.SourceTypes.URL;
        this.source = args.source || "http://unspecifiedurl.com/";
    }

    /*
        NOTE: weird bug with immer, using a js object breaks produce whereas using a json object
        does not. Use toJSON() to convert model to a JSON before adding to state
    */
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            location: this.location,
            type: this.type,
            source: this.source
        };
    }
}

// takes raw streamproc node config for VideoSource and converts it to something useful
const ParseNodeConfigToRawJSON = (nodeConfig) => {

};


/*
    sources
    {
        id : {
            id : ...,
            name: string,
            location: string,
            source: string
        },
        ...
    }
*/
const VideoSourceSelector = ({parsedNodeConfig}) => {

    const [activeSourceKey, setActiveSourceKey] = useState(undefined);

    const [sources, setSources] = useState(parsedNodeConfig.sources || {});

    // if current active source deleted, just get a random one
    const getDefaultActiveSource = () => {
        return Object.keys(sources)[0] || undefined;
    };

    const onChangeActiveSource = (evt) => {
        setActiveSourceKey(evt.target.value);
    };

    const onAddVideoSource = () => {
        //console.log(sources);
        setSources(
            produce((draft) => {
                const id = uuidv4();
                draft[id] = new VideoSourceModel({
                    id: id
                }).toJSON();
            })
        );
    };

    const onDeleteVideoSource = (id) => {
        if (id in sources) {
            setSources(produce((draft)=>{
                delete draft[id];
            }));
        } else {
            console.log(`could not find ${id} in sources`);
        }
    };

    /*
        changes name of video source to a new name, this function is fed into videosourceblock --> simpletextinput
    */
    const onChangeName = (newName, id) => {
        if (id in sources) {
            setSources(produce((draft) => {
                draft[id].name = newName;
                return draft;
            }));

            /*
            setSources({
                ...sources,
                [id]: new VideoSourceModel({id: id, name: newName || "", location: sources[id].location, source: sources[id].source})
            });*/
        } else {
            console.log(`could not find ${id} in sources`);
        }
    };

    const onChangeLocation = (newLoc, id) => {
        if (id in sources) {
            setSources(produce((draft) => {
                draft[id].location = newLoc;
                return draft;
            }))
        } else {
            console.log(`could not find ${id} in sources`);
        }
    };

    // this is passed all the way down to videosourceeditor
    /*
        newSrc
        {
            source: string, 
            type: VideoSourceModel.SourceTypes enum
        }
    */
    const onChangeSource = (newSrc, id) => {
        if (id in sources) {
            var flag = false;
            for (var k in VideoSourceModel.SourceTypes) {
                if (VideoSourceModel.SourceTypes[k] == newSrc.type) {
                    flag = true;
                }
            }
            if (flag == false) {
                console.log("invalid source type");
            }

            setSources(produce((draft) => {
                draft[id].type = newSrc.type;
                draft[id].source = newSrc.source;
                return draft;
            }));
        } else {
            console.log(`could not find ${id} in sources`);
        }
    };

    // each row in the table
    const generateVideoSourceBlocks = () => {
        var blocks = [];
        for (var key in sources) {
            const s = sources[key];
            blocks.push(
                <VideoSourceRowDisplay
                    key={`${blocks.length + 1}`}
                    videoSourceModel={s}
                    onChangeName={onChangeName}
                    onChangeLocation={onChangeLocation}
                    onChangeSource={onChangeSource}
                    onDelete={onDeleteVideoSource}
                />
            );
        }
        return blocks;
    };

    // each source option
    /*
        only allow selection of option if it has a valid source 
    */
    const generateActiveSourceOptions = () => {
        var options = [];
        for (var id in sources) {
            const s = sources[id];
            options.push(
                <option
                    key={`${options.length + 1}`}
                    value={id}
                >{s.name}</option>
            );
        }
        return options;
    };

    // on change of sources: add, remove, edit
    useEffect(()=>{

        //console.log(sources);

        /*
            active key removed as a source: sets it to new one
            new source added with no current sources (active key undefined): sets it to newly added one
        */
        if (!(activeSourceKey in sources)) {
            setActiveSourceKey(getDefaultActiveSource());
        }

    }, [sources]);

    return (
        <div id="selectorcontainer">

            <form>
                <label>
                    Select active video source
                    <br/>
                    {Object.keys(sources).length > 0 ?
                        <select
                            value={activeSourceKey}
                            onChange={onChangeActiveSource}
                        >
                            {generateActiveSourceOptions()}
                        </select>
                        : "(no sources registered)"
                    }
                </label>
            </form>

            <div className="basicborder">

                {Object.keys(sources).length > 0 ? (
                    <div style={{
                        display:"flex",
                        flexDirection:"row"
                    }}>
                        <p className="subblock centertxt">Source name</p>
                        <p className="subblock centertxt">Physical location</p>
                        <p className="subblock centertxt">Data source</p>
                    </div>
                ) : null }

                {generateVideoSourceBlocks()}

            </div>

            <button id="addsourcebutton" title="add video source" onClick={onAddVideoSource}>Add video source</button>
        </div>
    );
};

/*
VideoSourceSelector.propTypes = {
    parsedNodeConfig : PropTypes.shape({
        sources : PropTypes.objectOf(PropTypes.instanceOf(VideoSourceModel))
    }).isRequired
};*/

export {VideoSourceModel, ParseNodeConfigToRawJSON, VideoSourceSelector};