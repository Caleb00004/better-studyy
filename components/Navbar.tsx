import Link from "next/link"

const Navbar = () => {
    return (
        <div className=" absolute w-full">
            <div className="flex items-center justify-between py-3 px-10 text-white">
                <Link href={"/"}><h1 className='text-[2em] text-light'>Study Better</h1></Link>
                <Link href={"/games"} ><p className="text-[1.3em] text-light">Games</p></Link>
                <Link href={"/flashcards"} ><p className="text-[1.3em] text-light">Flash Cards</p></Link>
            </div>
        </div>
    )
}

export default Navbar