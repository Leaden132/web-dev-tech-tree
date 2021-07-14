import React, { useContext, useState, useEffect } from 'react';

const ScreenContext = React.createContext({});


export function useScreen() {
    return useContext(ScreenContext)
}

export function ScreenProvider({children}) {
    const [onTopNode, setOnTopNode] = useState(false);


    function OnTopNodeSetter(onNode) {
        return setOnTopNode(onNode);
    }



    const value = {
        onTopNode,
        OnTopNodeSetter
    }

    return (
        <ScreenContext.Provider value={value}>
            {children}
        </ScreenContext.Provider>
    )

}
