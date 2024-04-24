import { useState, createContext, useContext } from 'react';

export const BattleTagContext = createContext();

export const BattleTagProvider = ({ children }) => {
    const [savedBattleTags, setSavedBattleTags] = useState([]);

    const saveBattleTag = (battleTag) => {
        setSavedBattleTags((prevTags) => [...prevTags, battleTag]); // Adds the new battleTag to the savedBattleTags array
    };

    return (
        <BattleTagContext.Provider value={{ savedBattleTags, saveBattleTag }}>
            {children}
        </BattleTagContext.Provider>
    )
}