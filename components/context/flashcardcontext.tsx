import React, { Children, ReactNode, createContext, useLayoutEffect, useState } from "react";
import { ChangeEvent } from "react";

interface AppContextProps {
    flashCards: {topic: string, note: string}[],
    createFlashCard: (e: ChangeEvent<HTMLInputElement>) => void,
    details: {topic: string, note: string},
    setDetails: React.Dispatch<React.SetStateAction<{topic:string, note: string}>>
}

const appContext = createContext<AppContextProps>({
    flashCards: [],
    createFlashCard: () => {},
    details: {topic: "", note: ""},
    setDetails: () => {}
})

function ContextProvider({children}: {children: ReactNode}) {
    const [flashCards, setFlashCards] = useState<{topic:string, note: string}[]>([])
    const [details, setDetails] = useState({
        topic: "",
        note: ""
    })

    const createFlashCard = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const data = localStorage.getItem("flashcards")
        const flashCards = JSON.parse(data)

        flashCards && localStorage.setItem("flashcards", JSON.stringify([...flashCards, details]))
        !flashCards && localStorage.setItem("flashcards", JSON.stringify([details]))

        setFlashCards(prev => ([...prev, details]))
        setDetails({
            topic: "",
            note: ""
        })
    }

    useLayoutEffect(() => {
        const data = localStorage.getItem("flashcards")
        data && setFlashCards(JSON.parse(data))
    },[])
 
    const contextValue = {
        flashCards,
        createFlashCard,
        details,
        setDetails
    }

    return (
        <appContext.Provider value={contextValue} >{children}</appContext.Provider>
    )
}

export {appContext, ContextProvider}