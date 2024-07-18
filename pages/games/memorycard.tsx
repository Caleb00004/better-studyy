import Layout from "@/components/layout"
import Image, { StaticImageData } from "next/image"
import { useState } from "react"
import img from "../../public/img/game-preview.png"

type ItemsType = {
    id: number,
    img: StaticImageData,
    stat: "correct" | "wrong" | "active" | ""
}

// @ts-ignore
function Card({item, id, handleClick}){
    const itemClass = item.stat ? " active " + item.stat : ""
    // console.log(item)
    
    return (
        <div className={"card" + itemClass} onClick={() => handleClick(id, item)}>
            {/* @ts-ignore */}
            <Image width={1000} height={1000} src={item.img} alt="d" />
        </div>
    )
}

const MemoryCard = () => {

    const initialItems: ItemsType[] = [
        { id: 1, img: require('/public/img/html.png'), stat: "" },
        { id: 1, img: require('/public/img/html.png'), stat: "" },
        { id: 2, img: require('/public/img/css.png'), stat: "" },
        { id: 2, img: require('/public/img/css.png'), stat: "" },
        { id: 3, img: require('/public/img/js.png'), stat: "" },
        { id: 3, img: require('/public/img/js.png'), stat: "" },
        { id: 4, img: require('/public/img/scss.png'), stat: "" },
        { id: 4, img: require('/public/img/scss.png'), stat: "" },
        { id: 5, img: require('/public/img/react.png'), stat: "" },
        { id: 5, img: require('/public/img/react.png'), stat: "" },
        { id: 6, img: require('/public/img/vue.png'), stat: "" },
        { id: 6, img: require('/public/img/vue.png'), stat: "" },
        { id: 7, img: require('/public/img/angular.png'), stat: "" },
        { id: 7, img: require('/public/img/angular.png'), stat: "" },
        { id: 8, img: require('/public/img/nodejs.png'), stat: "" },
        { id: 8, img: require('/public/img/nodejs.png'), stat: "" }
    ];

    // Shuffle the items array
    const shuffleArray = (array: ItemsType[]): ItemsType[] => {
        return array.sort(() => Math.random() - 0.5);
    };

    const [items, setItems] = useState<ItemsType[]>(shuffleArray(initialItems));

    //  const [items, setItems] = useState<ItemsType[]>([
    //     { id: 1, img: require('/public/img/html.png'), stat: "" },
    //     { id: 1, img: require('/public/img/html.png'), stat: "" },
    //     { id: 2, img: require('/public/img/css.png'), stat: "" },
    //     { id: 2, img: require('/public/img/css.png'), stat: "" },
    //     { id: 3, img: require('/public/img/js.png'), stat: "" },
    //     { id: 3, img: require('/public/img/js.png'), stat: "" },
    //     { id: 4, img: require('/public/img/scss.png'), stat: "" },
    //     { id: 4, img: require('/public/img/scss.png'), stat: "" },
    //     { id: 5, img: require('/public/img/react.png'), stat: "" },
    //     { id: 5, img: require('/public/img/react.png'), stat: "" },
    //     { id: 6, img: require('/public/img/vue.png'), stat: "" },
    //     { id: 6, img: require('/public/img/vue.png'), stat: "" },
    //     { id: 7, img: require('/public/img/angular.png'), stat: "" },
    //     { id: 7, img: require('/public/img/angular.png'), stat: "" },
    //     { id: 8, img: require('/public/img/nodejs.png'), stat: "" },
    //     { id: 8, img: require('/public/img/nodejs.png'), stat: "" }
    // ])
    
    const [startGame, setStartGame] = useState(false)

    const isGameFinished = items.every(item => item.stat === "correct")
    const [prev, setPrev] = useState(-1)

    const restartGame = () => {
        setStartGame(false)
        setItems([
            { id: 1, img: require('/public/img/html.png'), stat: "" },
            { id: 1, img: require('/public/img/html.png'), stat: "" },
            { id: 2, img: require('/public/img/css.png'), stat: "" },
            { id: 2, img: require('/public/img/css.png'), stat: "" },
            { id: 3, img: require('/public/img/js.png'), stat: "" },
            { id: 3, img: require('/public/img/js.png'), stat: "" },
            { id: 4, img: require('/public/img/scss.png'), stat: "" },
            { id: 4, img: require('/public/img/scss.png'), stat: "" },
            { id: 5, img: require('/public/img/react.png'), stat: "" },
            { id: 5, img: require('/public/img/react.png'), stat: "" },
            { id: 6, img: require('/public/img/vue.png'), stat: "" },
            { id: 6, img: require('/public/img/vue.png'), stat: "" },
            { id: 7, img: require('/public/img/angular.png'), stat: "" },
            { id: 7, img: require('/public/img/angular.png'), stat: "" },
            { id: 8, img: require('/public/img/nodejs.png'), stat: "" },
            { id: 8, img: require('/public/img/nodejs.png'), stat: "" }
        ])
    }

    // @ts-ignore
    function check(current){
        if(items[current].id == items[prev].id){
            items[current].stat = "correct"
            items[prev].stat = "correct"
            setItems([...items])
            setPrev(-1)
        }else{
            setPrev(-1)
            items[current].stat = "wrong"
            items[prev].stat = "wrong"
            setItems([...items])
            setTimeout(() => {
                items[current].stat = ""
                items[prev].stat = ""
                setItems([...items])
            }, 1000)
        }
    }

    // @ts-ignore
    function handleClick(id, item){
        if (item.stat === "correct") { return }
        // console.log(id)
        console.log(item)
        if(prev === -1){
            items[id].stat = "active"
            // setItems([...items])
            setPrev(id)
        }else{
            check(id)
        }
    }

    return (
        // @ts-ignore
        <Layout>
            <h1 className="text-[1.3em] text-center mb-4">Memory Card</h1>
            <div className="text-left w-[30em] mx-auto mt-2 mb-7 italic">
                <p>How To Play ?</p>
                <p>You will be given a grid of face down cards. there are 2 matching pairs of cards. The objective is to find all matching pairs of cards.</p>
                <p className="text-green-500">Note: You are only allowed to flip over 2 cards at a time</p>
            </div>

            {!startGame && <button className="bg-green-500 px-9 py-1 mx-auto rounded-sm" onClick={() => setStartGame(true)}>Start Game</button>}

            {startGame && 
            <div className="container">
                { items.map((item, index) => {
                    return (
                    // @ts-ignore
                    <Card key={index} item={item} id={index} handleClick={handleClick} />
                )}) }
            </div>}

            {isGameFinished && <button onClick={restartGame} className="bg-brand my-8 w-[10em] mx-auto py-1">RESTART</button>}
        </Layout>
    )
}

export default MemoryCard