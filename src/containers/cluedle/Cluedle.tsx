import { useState } from "react"
import SearchBar from "../../components/search_bar/SearchBar"
import data from "./CluedleDataTest"
import { Guessable } from "./CluedleTypes"

const AttributeBox = (props: {
    color: 'red' | 'green' | 'gray' | 'white',
    text: string
}) => {
    return <div style={{
        backgroundColor: props.color,
        width: 64,
        height: 64,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 4
    }}>
        <p style={{textAlign: 'center'}}>{props.text}</p>
    </div>
}

const LabelRow = () => {
    return <div style={{
        display: "flex",
        flexDirection: 'row',
    }}>
        <AttributeBox color='gray' text="Name"/>
        <AttributeBox color='gray' text="Race"/>
        <AttributeBox color='gray' text="Height (cm)"/>
        <AttributeBox color='gray' text="Weight (cm)"/>
    </div>
}

const GuessRow = (props: {
    target: Guessable,
    row: Guessable,
    rowName: string,
}) => {

    return <div style={{
        display: "flex",
        flexDirection: 'row',
    }}>
        <AttributeBox color='white' text={props.rowName}/>
        <AttributeBox color={
            props.row.race === props.target.race ? 'green' : 'red'
        } text={props.row.race}/>
        <AttributeBox color={
            props.row.height_cm === props.target.height_cm ? 'green' : 'red'
        } text={`${props.row.height_cm !== props.target.height_cm ? (props.row.height_cm < props.target.height_cm ? '>' : '<') : ''}${props.row.height_cm}`}/>
        <AttributeBox color={
            props.row.weight_lb === props.target.weight_lb ? 'green' : 'red'
        } text={`${props.row.weight_lb !== props.target.weight_lb ? (props.row.weight_lb < props.target.weight_lb ? '>' : '<') : ''}${props.row.weight_lb}`}/>
    </div>
}

export const Cluedle = () => {

    const [target, setTarget] = useState<Guessable>(data[Math.floor(Math.random() * data.length)])
    const [guesses, setGuesses] = useState<Guessable[]>([])
    const [gameover, setGameover] = useState(false)
    const [key, setKey] = useState(Date.now())

    const resetGame = () => {
        setTarget(data[Math.floor(Math.random() * data.length)])
        setGuesses([])
        setGameover(false)
        setKey(Date.now())
    }

    const onSubmitGuess = (guess: string) => {
        const guessed_person = data.find((e) => e.name === guess)
        if (guessed_person) {
            setGuesses([
                ...guesses,
                guessed_person
            ])
        } else {
            alert(`${guess} is not an option to guess`)
        }

        if (guessed_person === target) {
            alert("You won!")
            setGameover(true)
        }
    }

    return <>
        <SearchBar key={key} queryables={data.map((g) => { return g.name })} onSubmitGuess={onSubmitGuess}/>
        <LabelRow/>
        {guesses.map((g) => <GuessRow target={target} row={g} rowName={g.name}/>)}
        <button style={{display: gameover ? "inherit" : "none"}} onClick={resetGame}>Reset game</button>
    </>
}

