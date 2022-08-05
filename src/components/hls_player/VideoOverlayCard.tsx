import "./index.css";

const VideoOverlayCard = (
    props : {
        children: JSX.Element | never[],
        title: string,
        onclick?: React.MouseEventHandler<HTMLDivElement>
    }
) => {
    return <div className="overlay-card-container" onClick={props.onclick}>
        <p>{props.title}</p>

        {props.children}
    </div>;
};

export default VideoOverlayCard;