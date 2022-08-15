import * as d3 from "d3";
import {useEffect, useRef,} from "react";

export interface TooltipData {
    count: number,
    data: string
}

export default function D3Tooltip (props:{data:Array<TooltipData>}) {
    
    const tooltipRef = useRef(null);

    // drawing constants
    const colors = ["red", "black", "blue", "green", "purple", "grey", "orange"];
    const rectSizes = {width: 60, height: 20};
    const rectY = 20;
    const tooltipSizes = {width: 50};

    useEffect(() => {
        const tooltip = d3.select(tooltipRef.current);
        
        d3.selectAll(".data-block")
            .on("mouseover", (d) => {
                // d has rect set as target element
                const dataKey = d.target.parentNode.attributes.getNamedItem("data-key").value;
                const data:TooltipData = props.data[dataKey];

                // set text to auto set height first
                tooltip.select("#tooltip-text").text(data.data);

                const newTooltipPosition = {
                    x: (dataKey * rectSizes.width) - (tooltipSizes.width/2),
                    y: rectY - (tooltip.node() as any).getBoundingClientRect().height - 5
                };

                tooltip
                    .style("top", `${newTooltipPosition.y}px`)
                    .style("left", `${newTooltipPosition.x}px`);
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
                height:"50px", width:"500px",
                position:"relative",
                top:"100px",
                border:"1px solid black"
            }}
        >
            <svg
                style={{height:"100%", width:"100%"}}
            >
                {props.data.map((item, i) => {
                    return <g
                        key={i}
                        data-key={i}
                        className="data-block"
                        transform={`translate(${i * rectSizes.width}, ${rectY})`}
                    >
                        <rect
                            x="0px"
                            y="0px"
                            width={`${rectSizes.width}px`}
                            height={`${rectSizes.height}px`}
                            fill={colors[Math.floor(Math.random() * colors.length)]}
                        ></rect>

                        <text
                            x={`${rectSizes.width/3}px`}
                            y={`${rectSizes.height - 3}px`}
                            fontFamily={"Verdana"}
                            fontSize={"16"}
                            fill={"white"}
                            pointerEvents="none"
                        >{item.count}</text>
                    </g>;
                })}
            </svg>

            <div
                ref={tooltipRef}
                style={{
                    position:"absolute",
                    width:`${tooltipSizes.width}`,
                    height:"auto",
                    wordBreak:"break-all",
                    border:"1px solid black",
                    background:"white",
                    opacity: "0",
                    pointerEvents:"none" // VERY IMPORTANT
                }}
            >
                <p>Event Breakdown</p>
                <br/>
                <p id="tooltip-text"></p>
            </div>
        </div>
    );
};