import { useEffect, useState } from "react";
import {useScreen} from '../context/ScreenContext';


const NodeConnector = ({nodePositionData, parentNodePositionData, initialPositionData, movingPosition}) => {

    const [lineHeight, setLineHeight] = useState();
    const [lineX, setLineX] = useState();
    const [lineY, setLineY] = useState();
    const [connectStyle, setConnectStyle] = useState();
    const {onTopNodeSetter} = useScreen();


    const calculateInitialLines = (nodePositionData, parentNodePositionData) => {
        
        
        const {x, y, width, height} = nodePositionData;
        // const {xParent,yParent, widthParent, heightParent} = parentNodePositionData;

        console.log(parentNodePositionData);
        // console.log(parentNodePositionData.x)
        // const xParent = 100;
        
        // const yParent = 200;
        
        if (parentNodePositionData){
        const xParent = parentNodePositionData.x
        const yParent = parentNodePositionData.y
        const widthParent = parentNodePositionData.width
        const heightParent = parentNodePositionData.height
        

        // // if (x > xParent && y > yParent && (x - xParent) > (y - yParent)) {
        // //     //left
        // // }
    
        const xDiff = Math.abs(x - xParent);
        const yDiff = Math.abs(y - yParent);
        const length = Math.sqrt((Math.pow(xDiff, 2) + Math.pow(yDiff, 2)))
        const theta = Math.atan((xDiff/yDiff))
        console.log(theta);
        const angle = (theta * (180/Math.PI)) || 0;
        //radians * (180/Math.PI);
        console.log(xParent);

        console.log(xDiff);
        setLineHeight(Math.sqrt((Math.pow(xDiff, 2) + Math.pow(yDiff, 2))))
        setLineX(x);
        setLineY(y);
        setConnectStyle({
            backgroundColor: 'black',
            width:'5px',
            height:`${length}px`,
            position:'absolute',
            left:`${x}px`,
            top:`${y}px`,
            zIndex:'10',
            transform: `rotate(${angle}deg) translate(${0}px, ${-length}px)`,
            transformOrigin: `top left` 
            // transform: `translate(${0}px, ${-length}px)`
        })
    }}

    const calculateLines = (nodePositionData, parentNodePositionData) => {

        console.log('change!')

    }
    

    useEffect(()=>{
        calculateInitialLines(nodePositionData, parentNodePositionData)
    },[])


    // useEffect(()=>{
    //     calculateLines(nodePositionData, parentNodePositionData)
    // },[nodePositionData])




    //  setConnectStyle({
    //     backgroundColor: 'black',
    //     width:'5px',
    //     height:`${lineHeight}px`,
    //     position:'absolute',
    //     left:`${lineX}px`,
    //     top:`${lineY}px`,
    //     zIndex:'10'
    // })

    return (
        <div style={connectStyle}
        onMouseEnter={()=>onTopNodeSetter(true)}
        onMouseLeave={()=>onTopNodeSetter(false)}
        >line</div>
    )
}

export default NodeConnector;