import Image from "next/image"
import Layout from "@/components/layout"
import Link from "next/link"

const GamesHome = () => {
    return (
        <Layout>
            <h1 className="text-[1.5em] text-center">Welcome to the cognitive games section. </h1>
            <p className="text-center italic pb-7">Play Games to improve your cognitive abilities </p>
            <div className="flex gap-8 mt-6 justify-center">
                <Link href={"/games/sequencerecall"} className="relative">
                    <div className=" cursor-pointer hover:scale-[1.05] duration-300 transition-all flex flex-col h-[17em] text-center w-[20em]">
                        <div className="bg-[#a17947] flex-[6] border"><Image src={require("../../public/sequence recall img.png")} alt="sr" width={2000} height={2000} className="h-full" /> </div> 
                        <p className="w-[70%] absolute bottom-0 left-[15%] opacity-0 transition-all duration-300 text-[0.9em]">Test your memory</p>                        
                        <p className="flex-1 border-b border-x ">Sequece Recall</p>
                    </div>
                </Link>

                <Link href={"/games/memorycard"} className="relative">
                    <div className="cursor-pointer relative hover:scale-[1.05] duration-300 transition-all flex flex-col h-[17em] w-[20em] text-center games-container">
                        <div className="bg-[#a17947] flex-[6] border"><Image src={require("../../public/memory game img.png")} alt="sr" width={2000} height={2000} className="h-[14.45em]" /></div>
                        <p className="w-[70%] absolute bottom-0 left-[15%] opacity-0 transition-all duration-300 game-animate-text text-[0.9em]">Test your visual memory and concentration</p>
                        <p className="flex-1 border-b border-x z-[2] relative bg-dark ">Memory Card</p>
                    </div>
                </Link>
            </div>
        </Layout>
    )
}

export default GamesHome