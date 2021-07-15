
import React, { useState, useEffect, useRef } from "react";
import {useScreen} from '../context/ScreenContext';
import nodeData from '../nodedata/nodeData'

const NodeBox = ({id, label, parent}) => {
    const Box1 = useRef();

    const data = nodeData

    // console.log(data);

    // const [horizontalDistance, setHorizontalDistance] = useState(0);
    // const [verticalDistance, setVerticalDistance] = useState(0);
    const [mouseDown, setMouseDown] = useState(false);
    const {OnTopNodeSetter} = useScreen();
    const horizontalDistance = useRef(0);
    const verticalDistance = useRef(0);


    const mouseDownHandler = function (e) {
        // Get the current mouse position
        console.log(e);
        console.log("node mouse down");
        horizontalDistance.current = e.clientX;
        verticalDistance.current = e.clientY;
        e.target.style.zIndex = "100";
        // e.target.parentElement.style.zIndex = "100";

        setMouseDown(true);
      };
    
      const mouseMoveHandler = (e) => {


        const container = document.getElementById('content')?document.getElementById('content'):null;
        

        // console.log(container);


        if (mouseDown) {
          const dx = e.clientX - horizontalDistance.current;
          const dy = e.clientY - verticalDistance.current;

          e.target.style.top = `${e.target.offsetTop + dy}px`; 
          e.target.style.left = `${e.target.offsetLeft + dx}px`;
    
          // if (e.target.offsetTop + dy > 500 || e.target.offsetTop + dy < -1900) {
          //   e.target.style.top = `${e.target.offsetTop}px`;
          // } else {
          //   e.target.style.top = `${e.target.offsetTop + dy}px`;
          // }
    
          // if (e.target.offsetLeft + dx > 1550 || e.target.offsetLeft + dx < -1900) {
          //   e.target.style.left = `${e.target.offsetLeft}px`;
          // } else {
          //   e.target.style.left = `${e.target.offsetLeft + dx}px`;
          // }
    
          horizontalDistance.current = e.clientX;
          verticalDistance.current = e.clientY;
        }
      };
    
      const mouseUpHandler = (e) => {
        console.log("mouse up");
        e.target.style.zIndex = "6";
        setMouseDown(false);
      };

      const mouseLeaveHandler = () => {
        OnTopNodeSetter(false);
        
        
        setMouseDown(false);
      }


    return (
        <div ref={Box1.current} className="nodeBox violet" 
        // draggable='true'
        onMouseDown={mouseDownHandler}
        onMouseUp={mouseUpHandler}
        onMouseMove={mouseMoveHandler}
        onMouseEnter={()=>OnTopNodeSetter(true)}
        onMouseLeave={mouseLeaveHandler}
        >
            <p>{label}</p>
          </div>
          
    )
}

export default NodeBox;