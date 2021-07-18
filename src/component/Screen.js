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
  const [movingPosition, setMovingPosition] = useState({});

  const {onTopNode} = useScreen();
  const data = nodeData
  const nodeArray = [];
  const nodeConnectorArray = [];
  const initialPositionData = {    
    1:{
    x: 10,
    y: 20,
    width: 20,
    height: 20,
    parent: 0
  }};

  const nodePositionData = {};

  const dataArray = data.map((node)=>{
    return {
      id: node.id,
      parent: node.parent,
      x: node.left,
    y: node.top,
  width: 300,
height:300}
  })

  for (let i=0; i<dataArray.length; i++){
    
    initialPositionData[i+1] = {x:dataArray[i].x,
    y:dataArray[i].y, parent:dataArray[i].parent, width:dataArray[i].width, height: dataArray[i].height}

    nodePositionData[i+1] = {x:dataArray[i].x,
      y:dataArray[i].y, parent:dataArray[i].parent, width:dataArray[i].width, height: dataArray[i].height}

  }

  console.log(nodePositionData);
  




  const buildNodePositionData = (id, x, y) => {
    nodePositionData[id] = {...nodePositionData[id],x:x,y:y,};
    console.log(nodePositionData[id])
  }

  const handleNodeMovement = (id , x , y, parent) => {
    buildNodePositionData(id, x, y);

    console.log(id);
    console.log(nodePositionData[id]);
    console.log(nodePositionData[parent]);

    // nodeConnectorArray[id] = (<NodeConnector nodePositionData = {nodePositionData[id]} parentNodePositionData = {nodePositionData[parent]} initialPositionData={initialPositionData[id]}/>)

    // console.log("moving!", id, x, y, parent)

    // setMovingPosition({id:id, x:x, y:y, parent:parent})

  }

  const handlePositionChange = (id , x , y, parent) => {

    console.log(id, x, y, parent);
    console.log(nodePositionData[id]);
    console.log(nodeConnectorArray[id-1]);

    nodeConnectorArray[id-1] = (<NodeConnector nodePositionData = {nodePositionData[id]} parentNodePositionData = {nodePositionData[parent]} initialPositionData={initialPositionData[id]}/>)

    console.log(nodeConnectorArray[id-1]);

  }


    data.map((node, index)=>{
      nodeArray.push(<NodeBox key={`node-${index}`} id={node.id} content={node.content} parent={node.parent}
      top={node.top} left={node.left} handleNodeMovement={handleNodeMovement}
      initialPositionData={initialPositionData}
      buildNodePositionData={buildNodePositionData}
      movingPosition={movingPosition}
      handlePositionChange={handlePositionChange}/>)
    })

    for (let i = 1; i < 15;i++ ){
      const {x, y, width, height} = nodePositionData[i]
      nodeConnectorArray.push(<NodeConnector nodePositionData = {nodePositionData[i]} parentNodePositionData = {nodePositionData[nodePositionData[i].parent]} initialPositionData={initialPositionData[i]}/>)
    }

    console.log(nodePositionData[2])
    // useEffect(()=>{
    //   //Object.keys(nodePositionData).length
    //   console.log(nodeConnectorArray)
    // },[])



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
{/* <NodeConnector nodePositionData = {nodePositionData[2]} parentNodePositionData = {{x:100, y:100, width:100, height:100, parent:1}} initialPositionData={initialPositionData[2]} movingPositoin={movingPosition}/> */}
        {nodeConnectorArray}
      </div>
    </div>
  );
};

export default Screen;
