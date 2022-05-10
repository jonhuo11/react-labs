/*
    a single row within the selector
*/

import produce from "immer";


const VideoSourceBlock = ({
    videoSourceModel,
    removeCb
}) => {
    return (
        <div className="videoSourceBlock">

            <div className="basicborder subblock">
                <p>{videoSourceModel.name}</p>
            </div>

            <div className="basicborder subblock">
                <p>location</p>
            </div>

            <div className="basicborder subblock">
                <p>source</p>
            </div>

            <div className="basicborder">
                <button onClick={()=>{
                    removeCb(produce((draft) => {
                        delete draft[videoSourceModel.id];
                    }));
                }}>delete</button>
            </div>

        </div>
    );
};

export default VideoSourceBlock;