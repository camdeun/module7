import React, {useContext, useState} from "react"


const EmojiContext = createContext();




export const EmojiProvider = ({ children }) => {
    const [emoji, setEmoji] = useState('😊');


    const handleUpdateEmoji = (newEmoji) => {
        setEmoji(newEmoji);
    
    const handleSwitchEmoji = () => {
        setEmoji ((prevEmoji) => (prevEmoji === '😊' ? '😊' : '😊'));
    }
}


    return (
        <EmojiContext.Provider value={{emoji, handleUpdateEmoji, handleSwitchEmoji}}>
            {props.children}
        </EmojiContext.Provider>
    );
}



export const useEmojiContext = () => {
    return useContext(EmojiContext);
}