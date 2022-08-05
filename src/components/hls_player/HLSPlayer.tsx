import {useState, useRef} from "react";
import {IoRefresh} from "react-icons/io5";
import {RiLiveFill} from "react-icons/ri";

import "./index.css";
import VideoOverlayCard from "./VideoOverlayCard";

const HLSPlayer = () => {

    const [showOverlay, setShowOverlay] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    // when currentTime changes
    const onSeeked = () => {
        if (showOverlay)
            setShowOverlay(false);
    }

    const onVideoEnd = () => {
        //console.log("video ended");
        setShowOverlay(true);
    }

    const onClickRestart = () => {
        setShowOverlay(false);
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
        }
    }
    
    return <div
        className="stackparent"   
    >
        <video
            width="100%"
            ref={videoRef}
            onEnded={onVideoEnd}
            onSeeked={onSeeked}
            controls
        >
            <source
                // test video
                src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
                type="video/mp4"
            ></source>
        </video>

        { showOverlay ?
        <div
            className="stackchild"
        >
            <div className="video-overlay">

                <VideoOverlayCard
                    title={"REPLAY VIDEO"}
                    onclick={onClickRestart}
                >
                    <IoRefresh size={30} style={{marginTop:"10px"}}/>
                </VideoOverlayCard>

                <VideoOverlayCard
                    title={"GO TO LIVE VIEW"}
                    onclick={()=>{console.log("entering live view")}}
                >
                    <RiLiveFill size={30} style={{marginTop:"10px"}}/>
                </VideoOverlayCard>
                
            </div>
        </div>
        : <></> }
    </div>;

};

export default HLSPlayer;