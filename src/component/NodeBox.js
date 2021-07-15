
import React, { useState, useEffect, useRef } from "react";
import {useScreen} from '../context/ScreenContext';
import nodeData from '../nodedata/nodeData'
import {useMousePosition} from '../hooks/usePosition'

const NodeBox = ({id, label, parent}) => {
    const Box1 = useRef();
    const data = nodeData
    const [mouseDown, setMouseDown] = useState(false);
    const {OnTopNodeSetter} = useScreen();
    const horizontalDistance = useRef(0);
    const verticalDistance = useRef(0);
    const position = useMousePosition();

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


        // const container = document.getElementById('content')?document.getElementById('content'):null;

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
    
      const handleMouseUp = (e) => {
        console.log("mouse up");
        e.target.style.zIndex = "6";
        setMouseDown(false);
      };

      const handleMouseLeave = () => {
        OnTopNodeSetter(false);
        
          setMouseDown(false);

        
      }


    return (
        <div ref={Box1.current} className="nodeBox violet"
        id={id} 
        // draggable='true'
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseEnter={()=>OnTopNodeSetter(true)}
        onMouseLeave={handleMouseLeave}
        >
            <p>{label}</p>
            <p>{position.x}:{position.y}</p>
          </div>
          
    )
}

export default NodeBox;