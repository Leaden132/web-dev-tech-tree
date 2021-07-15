
//Still testing possibilities


import { useState, useRef, useEffect } from "react";
import NodeBox from "./NodeBox";
import {useScreen} from '../context/ScreenContext';
import nodeData from '../nodedata/nodeData'

const ScreenCanvas = () => {

  const screen = useRef();
  const [mouseDown, setMouseDown] = useState(false);
  const [nodeOneMouseDown, setNodeOneMouseDown] = useState(false);
  // const [horizontalDistance, setHorizontalDistance] = useState(0);
  // const [verticalDistance, setVerticalDistance] = useState(0);
  const horizontalDistance = useRef(0);
  const verticalDistance = useRef(0);
  const canvasRef = useRef(null)

  const {onTopNode} = useScreen();


  const data = nodeData

  const nodeArray = [];

  data.map((node)=>{

    nodeArray.push(<NodeBox id={node.id} label={node.label} parent={node.parent}/>)
  })

  console.log(data);


  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    //Our first draw
    context.fillStyle = 'grey'
    context.fillRect(0, 0, context.canvas.width, context.canvas.height)
  }, [])


  const mouseDownHandler = function (e) {
    // Get the current mouse position
    console.log(e);
    console.log("scene mouse down");
    horizontalDistance.current = e.clientX;
    verticalDistance.current = e.clientY;

    if(!onTopNode){
    setMouseDown(true);
}
  };

  const mouseMoveHandler = (e) => {
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

  const mouseUpHandler = () => {
    console.log("mouse up");
    setMouseDown(false);
  };

  return (
    <div className="screen" id="screen">
      
      <canvas ref={canvasRef}
      className="content"
      id="content"
      onMouseDown={mouseDownHandler}
      onMouseUp={mouseUpHandler}
      onMouseMove={mouseMoveHandler}
      onMouseLeave={()=>setMouseDown(false)}
      >
        <div id="dragme" className="draggable">
         {/* <NodeBox /> */}
          {nodeArray}

        </div>
        </canvas>
    </div>
  );
};

export default ScreenCanvas;
