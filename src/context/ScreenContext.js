import React, { useContext, useState, useEffect } from 'react';

const ScreenContext = React.createContext({});


export function useScreen() {
    return useContext(ScreenContext)
}

export function ScreenProvider({children}) {
    const [onTopNode, setOnTopNode] = useState(false);


    function onTopNodeSetter(onNode) {
        return setOnTopNode(onNode);
    }



    const value = {
        onTopNode,
        onTopNodeSetter
    }

    return (
        <ScreenContext.Provider value={value}>
            {children}
        </ScreenContext.Provider>
    )

}
