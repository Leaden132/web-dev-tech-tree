import { useState, useEffect, useRef } from "react";
import NodeBox from "./NodeBox";
import {useScreen} from '../context/ScreenContext';

const Screen = () => {

  const ele = useRef();
  const [mouseDown, setMouseDown] = useState(false);
  const [nodeOneMouseDown, setNodeOneMouseDown] = useState(false);
  const [horizontalDistance, setHorizontalDistance] = useState(0);
  const [verticalDistance, setVerticalDistance] = useState(0);

  const {onTopNode} = useScreen();


  const mouseDownHandler = function (e) {
    // Get the current mouse position
    console.log(e);
    console.log("scene mouse down");
    setHorizontalDistance(e.clientX);
    setVerticalDistance(e.clientY);

    if(!onTopNode){
    setMouseDown(true);
}
  };

  const mouseMoveHandler = (e) => {
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
    <div className="screen" id="screen">
      <div
        className="content"
        id="content"
        ref={ele}
        onMouseDown={mouseDownHandler}
        onMouseUp={mouseUpHandler}
        onMouseMove={mouseMoveHandler}
        onMouseLeave={()=>setMouseDown(false)}
      >
        <div id="dragme" className="draggable">
         <NodeBox/>
        </div>
      </div>
    </div>
  );
};

export default Screen;
