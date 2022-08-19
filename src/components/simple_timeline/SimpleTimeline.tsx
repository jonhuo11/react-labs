import * as d3 from "d3";
import { useEffect, useState, useRef} from "react";

export default function SimpleTimeline (props:{
    width:number
}) {
    const shiftY = 10;
    const height = 50;

    const focuserHeld = useRef<boolean>();
    const [focuserX, setFocuserX] = useState(0);

    // on start
    useEffect( () => {
        // create focuser
        focuserHeld.current = false;
        var svg = d3.select("#svg").on("mousedown", (event) => {alert("clicked svg");});
        if (svg.select("#focuser").empty()) {
            var focuser = svg.append("rect").attr("id", "focuser");
            const focuserWidth = 0.1 * props.width;
            focuser
                .attr("width", `${focuserWidth}px`)
                .attr("height", `${height + 5}px`)
                .attr("x", 0)
                .attr("y", shiftY - 2.5)
                .style("fill", "black")
                .on("mousedown", (e) => {
                    e.stopImmediatePropagation();
                    focuserHeld.current = true;
                })
                .on("mouseup", (e) => {
                    e.stopImmediatePropagation();
                    focuserHeld.current = false;
                });
            svg.on("mousemove", (e) => {
                e.stopPropagation();
                if (focuserHeld.current) {
                    var mousePos = d3.pointer(e);
                    mousePos[0] -= Number(d3.select("#backdrop").attr("x"));
                    mousePos[1] -= Number(d3.select("#backdrop").attr("y"));
                    
                    // if exited timeline
                    if (
                        mousePos[0] <= 0 ||
                        mousePos[0] >= props.width ||
                        mousePos[1] <= 0 ||
                        mousePos[1] >= height
                    ) {
                        focuserHeld.current = false;
                        return;
                    }

                    setFocuserX(mousePos[0] - focuserWidth/2);
                }
            });
        }

        // create events
        for (var i = 0; i < 10; i++) {
            svg.append("circle")
                .attr("class", "event-marker")
                .attr("cx", Math.random() * props.width)
                .attr("cy", shiftY + height/2)
                .attr("r", height * 0.25)
                .attr("fill", "red")
                .on("mouseup", (e) => { // so that unreleasing over a 
                    e.stopImmediatePropagation();
                    focuserHeld.current = false;
                })
                .on("mousedown", (e) => {
                    e.stopImmediatePropagation();
                    alert("event clicked");
                });
        }
    }, []);

    useEffect( () => {
        if (!d3.select("#focuser").empty()) {
            d3.select("#focuser").attr("x", `${focuserX}px`);
        }
    }, [focuserX]);

    return (<div>
        <svg id="svg" width="100%">
            <rect
                id="backdrop"
                width={`${props.width}px`}
                height={`${height}px`}
                fill="grey"
                strokeWidth={1}
                stroke={"black"}
                x={0}
                y={shiftY}
            />
        </svg>
    </div>);
};