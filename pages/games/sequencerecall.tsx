import Layout from "@/components/layout"
import { useState, useRef } from "react"

const SequenceRecall = () => {
    const [startGame, setStartGame] = useState(false) 
    const [showResults, setShowResults] = useState(false)
    const [isCorrect, setIsCorrect] = useState(false)
    const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard" | "">("")
    const [numberSequence, setNumberSequence] = useState<number[]>([])
    const [countdown, setCountDown] = useState(4)
    const [userInput, setUserInput] = useState({
        value1: "",
        value2: "",
        value3: "",
        value4: "",
        value5: "",
        value6: "",
        value7: "",
        value8: "",
        value9: "",
        value10: "",
        value11: "",
    })
    const inputRefs = useRef([]);

    const generateNumber = (): number[] => {
        const length = difficulty === "easy" ? 5 : difficulty === "medium" ? 7 : difficulty === "hard" && 11

        let numbers = []
        for (let i = 0; i < Number(length); i++) {
            let randomNum = Math.floor(Math.random() * 10)
            numbers.push(randomNum)
        }
        console.log(numbers)
        return numbers
    }

    const checkResult = () => {
        console.log(userInput)
        console.log(numberSequence)

        const allValues = Object.values(userInput);
        const user = allValues.join('');
        const system = numberSequence.join("")

        setShowResults(true)
        user === system ? setIsCorrect(true) : setIsCorrect(false)
    }

    const handleUpdateDifficulty = (set: "easy" | "medium" | "hard") => {
        setDifficulty(set)
    }

    const handleStartGame = () => {
        setStartGame(true);
        const getNumbers = generateNumber();
        setNumberSequence(getNumbers);

        // Start countdown with an interval of 1 second
        const intervalID = setInterval(() => {
            // Update the countdown
            setCountDown(prevCount => {
                const newCount = prevCount - 1;

                // Clear the interval if the new countdown is zero or less
                if (newCount <= 0) {
                    clearInterval(intervalID);
                }

                return newCount;
            });
        }, 1000);
    };

    const resetGame = () => {
        setStartGame(false)
        setNumberSequence([])
        setUserInput({
            value1: "",
            value2: "",
            value3: "",
            value4: "",
            value5: "",
            value6: "",
            value7: "",
            value8: "",
            value9: "",
            value10: "",
            value11: "",
        })
        setDifficulty("")
        setShowResults(false)
        setIsCorrect(false)
        setCountDown(4)
    }

    console.log(userInput)

    const disableEasy = () => {
        const allKeys = Object.keys(userInput)

        for (let i = 0; i < 5; i++ ) {
            if (Boolean(userInput[allKeys[i]]) == false) {
                return true
            }
        }
        return false
    };

    const disableMedium = () => {
        const allKeys = Object.keys(userInput)

        for (let i = 0; i < 7; i++ ) {
            if (Boolean(userInput[allKeys[i]]) == false) {
                return true
            }
        }
        return false
    };

    const disableHard = () => {
        const allKeys = Object.keys(userInput)

        for (let i = 0; i < 11; i++ ) {
            if (Boolean(userInput[allKeys[i]]) == false) {
                return true
            }
        }
        return false
    };

     const handleInputChange = (e, index) => {
        const { value } = e.target;
        
        // Update the user input state
        setUserInput(prevState => ({
            ...prevState,
            [`value${index + 1}`]: value,
        }));

        // Shift focus to the next input field if the current one is filled
        if (value && index < numberSequence.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    // const disableResultBtn = Boolean(difficulty === "easy" && checkEasyValues )
    const disableResultBtn = difficulty === "easy" ? disableEasy() : difficulty === "medium" ? disableMedium() : difficulty === "hard" && disableHard()
    console.log(disableResultBtn)

    return (
        <Layout>
            <div className="text-center relative">
                <h1 className="text-[1.6em] pb-5 mt-3">Sequence Recall</h1>
                {!startGame && 
                    <>
                        <div className="text-left italic w-[35em] mx-auto">
                            <h1>Objective of the game</h1>
                            <h4>You will be shown a series of numbers for a limited time and the objective is to repeat is too repeat the seqeunce </h4>
                        </div>
                        <div className="mt-8">
                            <p>Select Difficulty</p>
                            <div className="flex gap-5 justify-center mt-4">
                                <div onClick={() => handleUpdateDifficulty("easy")} className={`${difficulty === "easy" ? "bg-[#426462]" : "bg-slate-400"} py-9 px-3 cursor-pointer hover:scale-[1.05] duration-300 transition-all`}>
                                    <p>Easy</p>
                                    <p className="italic">You will be given 5 numbers</p>
                                </div>
                                <div onClick={() => handleUpdateDifficulty("medium")} className={`${difficulty === "medium" ? "bg-[#426462]" : "bg-slate-400"} py-9 px-3 cursor-pointer hover:scale-[1.05] duration-300 transition-all`}>
                                    <p>Medium</p>
                                    <p className="italic">You will be given 7 numbers</p>
                                </div>
                                <div onClick={() => handleUpdateDifficulty("hard")} className={`${difficulty === "hard" ? "bg-[#426462]" : "bg-slate-400"} py-9 px-3 cursor-pointer hover:scale-[1.05] duration-300 transition-all`}>
                                    <p>Hard</p>
                                    <p className="italic">You will be given 11 numbers</p>
                                </div>
                            </div>
                            <button onClick={handleStartGame} disabled={!difficulty} className=" bg-brand disabled:cursor-not-allowed disabled:bg-slate-400 px-4 py-2 mt-8 hover:bg-[#1d3749] duration-150 transition-all">Start Game</button>
                        </div>
                    </>
                }
                {startGame && 
                    <>
                        <div className="">
                            <p className="absolute right-10 text-[1.5em] bg-slate-500 px-3 rounded-full top-3">{countdown}</p>
                            {countdown !== 0 &&
                                <>                        
                                    <h3 className="text-[1.1em] pb-3">Number Sequence</h3>
                                    <p className="text-rose-500">{numberSequence.map(item => <span className="px-2 text-[1.7em]">{item}</span>)}</p>
                                </>
                            }
                            {countdown <= 0 && 
                                <>
                                    <div>
                                        <h2>Repeat Sequence</h2>
                                        <div className="flex gap-4 justify-center pt-4">
                                            {numberSequence.map((item, i) =>
                                                <input 
                                                    ref={el => inputRefs.current[i] = el} // Attach refs to the input fields
                                                    autoFocus={(i == 0) && true}
                                                    disabled={userInput[`value${i + 1}`]} 
                                                    // onChange={(e) => (setUserInput(item => ({...item, [`value${i + 1}`]: e.target.value})))} 
                                                    onChange={(e) => handleInputChange(e, i)}
                                                    type="number" 
                                                    className=" bg-slate-500 px-4 h-[5em] w-[5em] text-center " max={10}
                                                 />
                                            )}
                                        </div>
                                        {!showResults && <button disabled={disableResultBtn} onClick={checkResult} className="bg-brand disabled:bg-slate-300 disabled:text-black disabled:cursor-not-allowed px-8 py-1 mt-8">Submit</button>}
                                        {showResults && 
                                            <> 
                                                <p className="mt-3 text-green-500">{numberSequence.map(item => <span className="px-2 text-[1.7em]">{item}</span>)}</p>
                                                <p>{isCorrect ? <span className="text-green-500">Correct</span> : <span className=" text-red-500">Try Again</span>}</p>

                                                <button onClick={resetGame} className="bg-brand px-8 py-1 mt-5">Play Again</button>
                                            </>
                                        }

                                    </div>
                                </>
                            }
                        </div>
                    </>
                }
            </div>
        </Layout>
    )
}

export default SequenceRecall