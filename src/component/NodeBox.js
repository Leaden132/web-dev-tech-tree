
import React, { useState, useEffect, useRef } from "react";
import {useScreen} from '../context/ScreenContext';

const NodeBox = () => {
    const Box1 = useRef();

    const [horizontalDistance, setHorizontalDistance] = useState(0);
    const [verticalDistance, setVerticalDistance] = useState(0);
    const [mouseDown, setMouseDown] = useState(false);
    const {OnTopNodeSetter} = useScreen();

    const mouseDownHandler = function (e) {
        // Get the current mouse position
        console.log(e);
        console.log("node mouse down");
        setHorizontalDistance(e.clientX);
        setVerticalDistance(e.clientY);
        setMouseDown(true);
      };
    
      const mouseMoveHandler = (e) => {


        const container = document.getElementById('content')?document.getElementById('content'):null;
        

        console.log(container);


        if (mouseDown) {
          const dx = e.clientX - horizontalDistance;
          const dy = e.clientY - verticalDistance;

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
    
          setHorizontalDistance(e.clientX);
          setVerticalDistance(e.clientY);
        }
      };
    
      const mouseUpHandler = () => {
        console.log("mouse up");
        setMouseDown(false);
      };


    return (
        <div ref={Box1.current} className="nodeBox"         
        onMouseDown={mouseDownHandler}
        onMouseUp={mouseUpHandler}
        onMouseMove={mouseMoveHandler}
        onMouseEnter={()=>OnTopNodeSetter(true)}
        onMouseLeave={()=>{OnTopNodeSetter(false);
          setMouseDown(false);}}
        >
            Node 1!
          </div>
    )
}

export default NodeBox;