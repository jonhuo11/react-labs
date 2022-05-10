import { useState, useCallback, useEffect} from "react";
import produce from "immer";
import {v4 as uuidv4} from "uuid";

import "./index.css";
import VideoSourceBlock from "./VideoSourceBlock";

/*
    videosourcemodel
    {
        name: string,
        location: string,
        source: string
    }
*/
class VideoSourceModel {
    static shortNames = ["alpha", "beta", "charlie", "delta", "echo", "foxtrot","twitch","nasus","renekton","aatrox","jax","viego","ashe"];

    constructor(args) {
        this.id = args.id || undefined;
        this.name = args.name || `new source ${Date.now()} ${VideoSourceModel.shortNames[Math.floor(Math.random() * VideoSourceModel.shortNames.length)]}`;
        this.location = args.location || "unknown location";
        this.source = args.source || "unknown source";
    }
}

// takes raw streamproc node config for VideoSource and converts it to something useful
const ParseNodeConfig = (nodeConfig) => {

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

    const [sources, setSources] = useState(parsedNodeConfig.sources);

    // if current active source deleted, just get a random one
    const getDefaultActiveSource = () => {
        return Object.keys(sources)[0] || undefined;
    };

    const onChangeActiveSource = (evt) => {
        setActiveSourceKey(evt.target.value);
    };

    const onAddVideoSource = useCallback(()=>{
        //console.log(sources);
        setSources(
            produce((draft) => {
                const id = uuidv4();
                draft[id] = new VideoSourceModel({
                    id: id
                });
            })
        );
    }, []);

    // each row in the table
    const generateVideoSourceBlocks = () => {
        var blocks = [];
        for (var key in sources) {
            const s = sources[key];
            blocks.push(
                <VideoSourceBlock
                    key={`${blocks.length + 1}`}
                    videoSourceModel={s}
                    removeCb={setSources}
                />
            );
        }
        return blocks;
    };

    // each source option
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

        console.log(sources);

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
                    <select
                        value={activeSourceKey}
                        onChange={onChangeActiveSource}
                    >
                        {generateActiveSourceOptions()}
                    </select>
                </label>
            </form>

            <div className="basicborder">

                {generateVideoSourceBlocks()}

            </div>

            <button id="addsourcebutton" title="add video source" onClick={onAddVideoSource}>Add video source</button>
        </div>
    );
};

export {VideoSourceModel, ParseNodeConfig, VideoSourceSelector};