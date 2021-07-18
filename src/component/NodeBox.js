
import React, { useState, useEffect, useRef } from "react";
import {useScreen} from '../context/ScreenContext';
import nodeData from '../nodedata/nodeData'
// import {useMousePosition} from '../hooks/usePosition'

const NodeBox = ({id, content, parent, handleNodeMovement, buildNodePositionData, left, top, handlePositionChange}) => {
    const Box = useRef();
    const data = nodeData
    const [mouseDown, setMouseDown] = useState(false);
    const {onTopNodeSetter} = useScreen();
    const horizontalDistance = useRef(0);
    const verticalDistance = useRef(0);
    // const position = useMousePosition();

   

    

useEffect(()=>{
  
  Box.current.style.left = `${left}px`;
  Box.current.style.top = `${top}px`;
  const x = Box.current.style.left;
  const y = Box.current.style.top;
  const nodeWidth = Box.current.style.width;
  const nodeheight = Box.current.style.height;
  

  buildNodePositionData(id, x,y, nodeWidth, nodeheight)

},[])
            

        

        
      

      


      // buildNodePositionData(id,)


    // useEffect(()=>{
              
    //   const e = document.getElementById(`${id}`)
    //   if(mouseDown){
    //       const dx = e.clientX - horizontalDistance.current;
    //       const dy = e.clientY - verticalDistance.current;
    //       e.style.top = `${e.offsetTop + dy}px`; 
    //       e.style.left = `${e.offsetLeft + dx}px`;
    //       horizontalDistance.current = e.clientX;
    //       verticalDistance.current = e.clientY;
    //     }
    // },[position])

    const handleMouseDown = (e) => {

        console.log(e);
        console.log("node mouse down");
        horizontalDistance.current = e.clientX;
        verticalDistance.current = e.clientY;
        e.target.style.zIndex = "100";
        // e.target.parentElement.style.zIndex = "100";

        setMouseDown(true);

        // if(mouseDown){
        //   const dx = e.clientX - horizontalDistance.current;
        //   const dy = e.clientY - verticalDistance.current;

        //   e.target.style.top = `${e.target.offsetTop + dy}px`; 
        //   e.target.style.left = `${e.target.offsetLeft + dx}px`;

        //   horizontalDistance.current = e.clientX;
        //   verticalDistance.current = e.clientY;
        // }
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

          handleNodeMovement(id, parseInt(e.target.style.left), parseInt(e.target.style.top), parent)

        }
      };
    
      const handleMouseUp = (e) => {
        console.log("mouse up");
        e.target.style.zIndex = "6";
        setMouseDown(false);
        console.log(parseInt(e.target.style.left))
        handlePositionChange(id, parseInt(e.target.style.left), parseInt(e.target.style.top), parent)
      };

      const handleMouseLeave = () => {
        onTopNodeSetter(false);
          setMouseDown(false);
        
      }


    return (
        <div ref={Box} className={`nodeBox violet`}
        id={id} 
        // draggable='true'
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseEnter={()=>onTopNodeSetter(true)}
        onMouseLeave={handleMouseLeave}
        >
            {content.map((content, index)=>{
              return <p key={`content-${index}`}>{content}</p>
            })}
            {/* <p>{position.x}:{position.y}</p> */}
          </div>
          
    )
}

export default NodeBox;