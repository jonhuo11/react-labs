import {MutableRefObject, forwardRef} from "react";
import "./EventTooltip.css";

export enum EventTooltipEvents {
    BoundaryCrossing = "Boundary Crossing",
    Loitering = "Loitering",
    AbandonedPackage = "Abandoned Package"
};

export interface EventTooltipEvent {
    type: EventTooltipEvents,
    timestampMs: number
};

const CountEventTypes = (evts:Array<EventTooltipEvent>):Array<{count:number, type: EventTooltipEvents}> => {
    var tally:any = {};
    for (var i = 0; i < evts.length; i++) {
        var e = evts[i];
        if (!(e.type in tally)) {
            tally[e.type.toString()] = 1;
        } else {
            tally[e.type.toString()] += 1;
        }
    }
    var out:Array<{count:number, type: EventTooltipEvents}> = [];
    for (var key in tally) {
        out.push({
            type: key as EventTooltipEvents,
            count: tally[key]
        });
    }
    return out;
};

const EventTooltip = forwardRef((
    props:{events:any}, ref:any
) => {
    return (props.events ? <div
        ref={ref}
        className="event-tooltip-container"
        style={{
            position:"absolute",
            pointerEvents: "none",
            border:"1px solid black",
            backgroundColor:"white",
            display:"flex",
            flexDirection:"column",
            width:"100%",
            maxWidth:"175px"
        }}
    >
        <p style={{fontSize:"16px", paddingLeft:"min(5%, 10px)"}}>Event{props.events.length > 1 ? " Cluster" : ""} Details</p>

        <ul
            style={{
                fontSize:"12px",
                margin:"2px",
                listStylePosition:"outside",
                paddingLeft:"min(12.5%, 25px)"
            }}
        >{CountEventTypes(props.events).map((e, i) => {
            return <li key={i}>{e.count}x {e.type}</li>;
        })}</ul>

        <button style={{
            alignSelf:"center"
        }}>{
            props.events.length > 1 ? "Jump to first event in cluster" : "Jump to event"
        }</button>
    </div> : <></>);
});
export default EventTooltip;