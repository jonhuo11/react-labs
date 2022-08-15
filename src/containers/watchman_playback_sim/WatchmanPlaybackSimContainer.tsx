// TODO fix this demo is buggy

import * as d3 from "d3";
import { useEffect, useRef, useState} from "react";
import EventTooltip, { EventTooltipEvent } from "../../components/event_tooltip/EventTooltip";
import HLSPlayer from "../../components/hls_player/HLSPlayer";

interface EventGroup {
    avgTime: number,
    events:Array<EventTooltipEvent>
}

const FormEventGroups = (events:Array<EventTooltipEvent>, groupDist:number) => {
    var groups:Array<EventGroup> = [];
    for (var i = 0; i < events.length; i++) {
        var flag = false;
        for (var j = 0; j < groups.length; j++) {
            if (Math.abs(groups[j].avgTime - events[i].timestampMs) <= groupDist) {
                groups[j].events.push(events[i]);
                groups[j].avgTime = Math.floor(groups[j].events.reduce((prev, cur) => {
                    return prev + cur.timestampMs;
                }, 0) / groups[j].events.length);
                flag = true;
                break;
            }
        }
        if (!flag) {
            groups.push({
                avgTime: events[i].timestampMs,
                events: new Array<EventTooltipEvent>(events[i])
            });
        }
    }
    //console.log(groups);
    return groups;
};

const rectSizes = {
    width: 60, height: 20
};
const rectY = 30;
const colors = ["red","green","blue","orange","purple","grey","black"];
export default function WatchmanPlaybackSimContainer(props : {
    events : Array<EventTooltipEvent>
}) {

    const tooltipRef = useRef<any>();
    
    const [eventGroups, setEventGroups] = useState<Array<EventGroup>>(FormEventGroups(props.events, 100));
    const [key, setKey] = useState(0);

    useEffect(() => {
        const tooltip = d3.select(tooltipRef.current);
        tooltip.style("opacity", 0);

        d3.selectAll(".data-block")
            .on("mouseover", (d) => {
                const dataKey = d.target.parentNode.attributes.getNamedItem("data-key").value;
                setKey(dataKey);

                const newTooltipPosition = {
                    x: (dataKey * rectSizes.width) - (175/2),
                    y: rectY - (tooltip.node() as any).getBoundingClientRect().height - 5
                };
                tooltip
                    .style("top", `${newTooltipPosition.y}px`)
                    .style("left", `${newTooltipPosition.x}px`);
                tooltip.style("opacity", 1);
            })
            .on("mouseout", (d) =>  {
                tooltip.style("opacity", 0);
            });
    }, []);

    return <div style={{display:"flex", flexDirection:"column"}}>
        <HLSPlayer/>
        
        <div style={{
            border:"1px solid black",
            width:"800px",
            height:"100px",
            position:"relative"
        }}>
            <svg width="100%" height="100%">{
                eventGroups.map((group, i) => {
                    return <g
                        key={i}
                        data-key={i}
                        className="data-block"
                        transform={`translate(${i * rectSizes.width}, ${rectY})`}
                        pointerEvents="all"
                    >
                        <rect
                            x="0px"
                            y="0px"
                            width={`${rectSizes.width}px`}
                            height={`${rectSizes.height}px`}
                            fill={colors[Math.floor(Math.random() * colors.length)]}
                            pointerEvents="all"
                        ></rect>

                        <text
                            x={`${rectSizes.width/3}px`}
                            y={`${rectSizes.height - 3}px`}
                            fontFamily={"Verdana"}
                            fontSize={"16"}
                            fill={"white"}
                            pointerEvents="none"
                        >{group.events.length}</text>
                    </g>;
                })
            }</svg>

            <EventTooltip ref={tooltipRef} events={eventGroups[key].events || []}/>
        </div>
    </div>
};