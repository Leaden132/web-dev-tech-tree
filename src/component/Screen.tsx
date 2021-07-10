import {useState, useEffect} from 'react';



const Screen = () => {
    
    const [mouseDown, setMouseDown] = useState();

    const ele = document.getElementById('screen');
    
    if (ele){
    ele.scrollTop = 100;
    ele.scrollLeft = 150;
    }

    let pos = {
        top:0,
        left:0,
        x:0,
        y:0
    }

    const mouseMoveHandler = function(e:any) {
        // How far the mouse has been moved
        const dx = e.clientX - pos.x;
        const dy = e.clientY - pos.y;

        if (ele) {
    
        // Scroll the element
        ele.scrollTop = pos.top - dy;
        ele.scrollLeft = pos.left - dx;
        }
    };

    const mouseUpHandler = function() {
        if (ele) {
        ele.style.cursor = 'grab';
        ele.style.removeProperty('user-select');
        }
    };

    const mouseDownHandler = function(e:any) {
        
        if (ele) {
        pos = {
            left: ele?.scrollLeft,
            top: ele?.scrollTop,
            x: e.clientX,
            y: e.clientY
        }

        ele.style.cursor = 'grabbing';
        ele.style.userSelect = 'none';

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);


    }
    }

    console.log(ele);

    useEffect(()=>{


    },[])


    return (
        <div className="screen" id="screen">
            <div className="content" id="content">


            <p></p>





            </div>
        </div>
    )
}

export default Screen;