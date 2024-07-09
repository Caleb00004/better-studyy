import { FC, useState } from "react"
import { appContext } from "../context/flashcardcontext"
import { useContext } from "react"

interface PropType {
    handleClose: () => void
}

const CreateCardModal:FC<PropType> = ({handleClose}) => {
    const {createFlashCard, details, setDetails} = useContext(appContext)
    // const [details, setDetails] = useState({
    //     topic: "",
    //     note: ""
    // })

    // const handleSave = (e) => {
    //     e.preventDefault()
    //     const data = localStorage.getItem("flashcards")
    //     const flashCards = JSON.parse(data)

    //     flashCards && localStorage.setItem("flashcards", JSON.stringify([...flashCards, details]))
    //     !flashCards && localStorage.setItem("flashcards", JSON.stringify([details]))

    //     setDetails({
    //         topic: "",
    //         note: ""
    //     })
    // }

    return (
        <div className="fixed text-black inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-4 rounded-lg w-[90%] md:w-[30em] flex flex-col lg:h-auto xl:h-3/5 z-60 overflow-y-auto relative">
                <p onClick={handleClose} className="bg-red-600 cursor-pointer text-center w-6 text-white ml-auto rounded-full px-2">X</p>
                {/* @ts-ignore */}
                <form onSubmit={createFlashCard} className="mt-4 gap-2 flex flex-col h-full ">
                    <div>
                        <input value={details.topic} onChange={(e) => setDetails((prev) => ({...prev, topic: e.target.value}))} placeholder="Topic" className="border w-full py-1 px-3"/>
                    </div>
                    <div>
                        <textarea value={details.note} placeholder="Note" onChange={(e) => setDetails((prev) => ({...prev, note: e.target.value}))} className="border w-full py-1 px-3 h-[9em] max-h-[13em] min-h-[5em]" />
                    </div>
                    <button type="submit" className=" text-blue-800 text-[1.2em] pb-4 mt-auto">Save</button>
                </form>
            </div>
        </div>
    )
}

export default CreateCardModal