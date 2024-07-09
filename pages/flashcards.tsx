import Layout from "@/components/layout"
import { useLayoutEffect, useState } from "react"
import CreateCardModal from "@/components/flashcards/flashcardmodal"
import FlashCardItem from "@/components/flashcards/FlashcardItem"
import { appContext } from "@/components/context/flashcardcontext"
import { useContext } from "react"

const Flashcards = () => {
    const {flashCards} = useContext(appContext)
    const [displayFlex, setDisplayFlex] = useState(true)
    const [showCreateModal, setShowCreateModal] = useState(false)

    const hideModal = () => {
        setShowCreateModal(false)
    }

    // useLayoutEffect(() => {
    //     const data = localStorage.getItem("flashcards")
    //     data && setFlashCards(JSON.parse(data))
    // },[])
 
    // console.log(flashCards)

        return (
        <Layout>
            {showCreateModal && <CreateCardModal handleClose={hideModal} />}
            <div className="pb-8">
                <div className="flex">
                    <input className="ml-auto w-[40%] bg-slate-500 pl-2" placeholder="Search" />
                    <button className="bg-blue-500 px-2">search</button>
                    <button onClick={() => setShowCreateModal(true)} className=" bg-light text-black px-3 py-1 rounded-lg ml-auto">Create New +</button>
                </div>
                <div className={`flex ${displayFlex ? "flex-row" : "flex-col"} flex-wrap gap-4 justify-center items-center mt-[2.5em]`}>
                    {flashCards?.map(item => <FlashCardItem data={item} />)}
                    <div className=" bg-rose-400 flex flex-col w-[25em] h-[18em] p-4 flex-shrink-0 ">
                        <h3 className="font-bold text-[1.3em]">Biology</h3>
                        <p className="text-[0.9em] overflow-y-scroll">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus ex magnam distinctio iure, 
                            laudantium odit molestiae nihil quos expedita nesciunt? Recusandae aliquid eligendi laudantium, pariatur omnis dicta ipsa sint fugiat?
                        </p>
                        <p className="mt-auto ">Created at: 21-04-24</p>
                    </div>
                    <div className=" bg-pink-400 w-[25em] p-4 h-[18em] flex-shrink-0 ">
                        <h3 className="font-bold text-[1.3em]">Physics</h3>
                        <p className="text-[0.9em] overflow-y-scroll">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus ex magnam distinctio iure, 
                            laudantium odit molestiae nihil quos expedita nesciunt? Recusandae aliquid eligendi laudantium, pariatur omnis dicta ipsa sint fugiat?
                        </p>
                    </div>
                    <div className=" bg-green-400 w-[25em] p-4 h-[18em] flex-shrink-0 ">
                        <h3 className="font-bold text-[1.3em]">Chemistry</h3>
                        <p className="text-[0.9em] overflow-y-scroll">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus ex magnam distinctio iure, 
                            laudantium odit molestiae nihil quos expedita nesciunt? Recusandae aliquid eligendi laudantium, pariatur omnis dicta ipsa sint fugiat?
                        </p>
                    </div>
                    <div className=" bg-orange-400 w-[25em] p-4 h-[18em] flex-shrink-0 ">
                        <h3 className="font-bold text-[1.3em]">Arts</h3>
                        <p className="text-[0.9em] overflow-y-scroll">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus ex magnam distinctio iure, 
                            laudantium odit molestiae nihil quos expedita nesciunt? Recusandae aliquid eligendi laudantium, pariatur omnis dicta ipsa sint fugiat?
                        </p>
                    </div>
                    <div className=" bg-amber-700 w-[25em] p-4 h-[18em] flex-shrink-0 ">
                        <h3 className="font-bold text-[1.3em]">Computer</h3>
                        <p className="text-[0.9em] overflow-y-scroll">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus ex magnam distinctio iure, 
                            laudantium odit molestiae nihil quos expedita nesciunt? Recusandae aliquid eligendi laudantium, pariatur omnis dicta ipsa sint fugiat?
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Flashcards