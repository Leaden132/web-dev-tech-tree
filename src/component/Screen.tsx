import {useState, useEffect, useRef} from 'react';



const Screen = () => {
    
    const Box1 = useRef();
    // const ele = useRef();

// The current position of mouse
let x = 0;
let y = 0;

// Query the element
const ele:any = document.getElementById('content');

// Handle the mousedown event
// that's triggered when user drags the element

const mouseDownHandler = function(e:any) {
    // Get the current mouse position
    x = e.clientX;
    y = e.clientY;
    
    // Attach the listeners to `document`
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
};

const mouseMoveHandler = function(e:any) {
    // How far the mouse has been moved
    const dx = e.clientX - x;
    const dy = e.clientY - y;

    // Set the position of element
    console.log(ele.offsetTop + dy);
    console.log(ele.offsetLeft + dx);

    if(ele.offsetTop + dy > 500 || ele.offsetTop + dy < -1900) {
        ele.style.top=`${ele.offsetTop}px`;
        
        
    }
    else {
        ele.style.top = `${ele.offsetTop + dy}px`; 
    }

    if(ele.offsetLeft + dx > 1550 || ele.offsetLeft + dx < -1900) {
        ele.style.left = `${ele.offsetLeft}px`
        
    }

    else {
        ele.style.left = `${ele.offsetLeft + dx}px`;
    }
    

    // Reassign the position of mouse
    x = e.clientX;
    y = e.clientY;
};

const mouseUpHandler = function() {
    // Remove the handlers of `mousemove` and `mouseup`

    // ele.style.left = `${ele.offsetLeft + dx}px`
    // ele.style.top = `${ele.offsetTop + dy}px`; 

    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
};

ele.addEventListener('mousedown', mouseDownHandler);

    console.log(ele);

    useEffect(()=>{


    },[])


    return (
        <div className="screen" id="screen">
            <div className="content" id="content">
            <div id="dragme" className="draggable">
                
            <div ref={Box1.current} className="nodeBox">ok</div>


            </div>
            </div>
        </div>
    )
}

export default Screen;