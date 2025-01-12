import React, {createContext, useContext, useState} from 'react';

 const SearchContext = createContext();


export const SearchContextProvider = ({children})=>{
    const [searchTerm,setSearchTerm] = useState("");

    return(
        <SearchContext.Provider value={{searchTerm,setSearchTerm}}>
            {children}
        </SearchContext.Provider>
    )
}

export const useSearch = ()=> useContext(SearchContext);