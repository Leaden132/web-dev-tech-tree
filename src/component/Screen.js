import { useState, useRef, useEffect } from "react";
import NodeBox from "./NodeBox";
import {useScreen} from '../context/ScreenContext';
import nodeData from '../nodedata/nodeData';
import NodeConnector from './NodeConnector';

const Screen = () => {

  const screen = useRef();
  const [mouseDown, setMouseDown] = useState(false);
  // const [nodeOneMouseDown, setNodeOneMouseDown] = useState(false);
  // const [horizontalDistance, setHorizontalDistance] = useState(0);
  // const [verticalDistance, setVerticalDistance] = useState(0);
  const horizontalDistance = useRef(0);
  const verticalDistance = useRef(0);
  const [populateBox, setPopulateBox] = useState(false);

  const {onTopNode} = useScreen();
  const data = nodeData
  const nodeArray = [];
  const nodeConnectorArray = [];
  const nodePositionData = {};



  const buildNodePositionData = (id, x, y,width,height) => {
    nodePositionData[id] = {x,y,width,height};
  }

  const handleNodeMovement = (id , x , y, parent) => {
    buildNodePositionData(id, x, y);

    // nodeConnectorArray[id] = (<NodeConnector />)
  }

    data.map((node, index)=>{
      nodeArray.push(<NodeBox key={`node-${index}`} id={node.id} content={node.content} parent={node.parent}
      top={node.top} left={node.left} handleNodeMovement={handleNodeMovement}
      buildNodePositionData={buildNodePositionData}/>)
    })


    useEffect(()=>{


      for (let i = 1; i < Object.keys(nodePositionData).length;i++ ){
        
        const {x, y, width, height} = nodePositionData


        nodeConnectorArray.push(<NodeConnector nodePositionData = {nodePositionData[i]} parentNodePosition = {nodePositionData[nodePositionData.parent]}/>)
      }


    },[])



  const handleMouseDown = (e) => {
    // Get the current mouse position
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

      horizontalDistance.current = e.clientX;
      verticalDistance.current = e.clientY;
    }
  }

  const handleMouseUp = () => {
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
          {nodeArray}

        </div>
      </div>
    </div>
  );
};

export default Screen;
