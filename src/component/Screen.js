import { useState, useRef } from "react";
import NodeBox from "./NodeBox";
import {useScreen} from '../context/ScreenContext';
import nodeData from '../nodedata/nodeData'

const Screen = () => {

  const screen = useRef();
  const [mouseDown, setMouseDown] = useState(false);
  // const [nodeOneMouseDown, setNodeOneMouseDown] = useState(false);
  // const [horizontalDistance, setHorizontalDistance] = useState(0);
  // const [verticalDistance, setVerticalDistance] = useState(0);
  const horizontalDistance = useRef(0);
  const verticalDistance = useRef(0);

  const {onTopNode} = useScreen();


  const data = nodeData

  const nodeArray = [];

  data.map((node)=>{

    nodeArray.push(<NodeBox id={node.id} label={node.label} parent={node.parent}/>)
  })

  console.log(data);


  const handleMouseDown = (e) => {
    // Get the current mouse position
    console.log(e);
    console.log("scene mouse down");
    horizontalDistance.current = e.clientX;
    verticalDistance.current = e.clientY;

    if(!onTopNode){
    setMouseDown(true);
}
  };

  const handleMouseMove = (e) => {
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
  }

  const handleMouseUp = () => {
    console.log("mouse up");
    setMouseDown(false);
  };

  return (
    <div className="screen" id="screen">
      <div
        className="content"
        id="content"
        ref={screen}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={()=>setMouseDown(false)}
      >
        <div id="dragme" className="draggable">
         {/* <NodeBox /> */}
          {nodeArray}

        </div>
      </div>
    </div>
  );
};

export default Screen;
