import * as d3 from "d3";
import {useEffect, useRef,} from "react";

export default function D3Tooltip () {
    
    const tooltipRef = useRef(null);

    useEffect(() => {
        const tooltip = d3.select(tooltipRef.current);
        const tooltipHeight = (tooltip.node() as any).getBoundingClientRect().height;
        tooltip.style("opacity", "0");
        
        d3.select("#thing")
            .on("mouseover", (d) => {

                tooltip
                    .style("top", `${d.layerY - tooltipHeight}px`)
                    .style("left", `${d.layerX}px`);
                tooltip.transition()
                    .duration(200)
                    .style("opacity","0.9");
            })
            .on("mouseout", (d) => {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", "0");
            });
    }, []);

    return (
        <div
            style={{
                height:"250px", width:"500px",
                position:"relative",
                top:"100px"
            }}
        >
            <svg
                style={{height:"100%", width:"100%"}}
            >
                <rect id="thing" x="50" y="100" width="75" height="20" style={{strokeWidth:"1px", stroke:"rgb(0,0,0)"}}></rect>
            </svg>

            <div
                ref={tooltipRef}
                style={{
                    position:"absolute",
                    width:"65px",
                    height:"auto",
                    wordBreak:"break-all",
                    border:"1px solid black",
                    background:"white",
                    pointerEvents:"none" // VERY IMPORTANT
                }}
            >
                <p>Tooltip</p>
                <p>Some useful information about the subject is displayed here</p>
            </div>
        </div>
    );
};