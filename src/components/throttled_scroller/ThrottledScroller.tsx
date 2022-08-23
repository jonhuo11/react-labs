import { useEffect, useRef, useState} from "react";
import { Subject, Subscription, tap, sampleTime} from "rxjs";
import * as d3 from "d3";

export default function ThrottledScroller(props:{throttleMs:number}={throttleMs:50}) {
    const scrollSubject = useRef<Subject<WheelEvent>>();
    const scrollSubscription = useRef<Subscription>();
    const [size, setSize] = useState(200);

    // on mount
    useEffect(() => {
        scrollSubject.current = new Subject<WheelEvent>();
        scrollSubscription.current = scrollSubject.current.pipe(
            /*tap((e) => {
                console.log("received event");
            }),*/
            sampleTime(props.throttleMs)
        ).subscribe((event: WheelEvent) => {
            //console.log("processing event", 0.1 * event.deltaY);
            setSize((prev) => {
                return prev + 0.1 * event.deltaY;
            });
        });

        d3.select("#scaler").on("wheel", (e) => {
            e.preventDefault();
            e.stopImmediatePropagation();
            scrollSubject.current?.next(e);
        });

        // on dismount
        return () => {
            scrollSubscription.current?.unsubscribe();
        };
    }, []);

    return (<div style={{width:"500px", height:"500px"}}>
        <p>scroll me!</p>
        <svg width={"100%"} height={"100%"}>
            <rect id="scaler" width={size} height={size} fill={"red"}></rect>
        </svg>
    </div>);
};