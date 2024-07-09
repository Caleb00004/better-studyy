import { FC, useLayoutEffect, useState } from "react"

type PropType = {
    data: {
        topic: string,
        note: string,
    }
}

const FlashCardItem:FC<PropType> = ({data}) => {
    const colors = ["#eb4034", "#21d162", "#2b45b5", "#eb46b4", "#d4701e", "#2a9091", "#cf25b5", "#ed0c1f"]
    const [randomColor, setRandomColor] = useState("")
    
    useLayoutEffect(() => {
        const random = Math.random()
        const scaled = random * 8
        const randomNumber = Math.floor(scaled)
        setRandomColor(colors[randomNumber])
            // return randomNumber
    },[])

    return (
        <div style={{backgroundColor: randomColor}} className="  flex flex-col w-[25em] h-[18em] p-4 flex-shrink-0 ">
            <h3 className="font-bold text-[1.3em]">{data.topic}</h3>
            <p className="text-[0.9em] overflow-y-scroll">
                {data.note}
            </p>
            <p className="mt-auto ">Created at: 21-04-24</p>
        </div>
    )
}

export default FlashCardItem