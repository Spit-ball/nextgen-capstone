import { useState, createContext, useContext } from 'react';

export const BattleTagContext = createContext();

export const BattleTagProvider = ({ children }) => {
    const [savedBattleTags, setSavedBattleTags] = useState([]);

    const saveBattleTag = (battleTag) => {
        setSavedBattleTags((prevTags) => [...prevTags, battleTag]);
    };

    return (
        <BattleTagContext.Provider value={{ savedBattleTags, saveBattleTag }}>
            {children}
        </BattleTagContext.Provider>
    )
}