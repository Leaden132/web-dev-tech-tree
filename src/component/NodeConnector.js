import { useEffect } from "react";



const NodeConnector = ({nodePositionData, parentNodePositionData}) => {

    


    const calculateLines = (nodePositionData, parentNodePositionData) => {
        const {x, y, width, height} = nodePositionData;
        const {xParent,yParent, widthParent, heightParent} = parentNodePositionData;

        // if (x > xParent && y > yParent && (x - xParent) > (y - yParent)) {
        //     //left

        // }

        



    }

    useEffect(()=>{

        calculateLines(nodePositionData, parentNodePositionData)



    })




    const connectStyle = {
        backgroundColor: 'black'
        
    }

    return (
        <div style={connectStyle}></div>
    )
}

export default NodeConnector;