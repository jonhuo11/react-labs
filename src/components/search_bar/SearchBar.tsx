import { useEffect, useState } from "react"

const SearchBar = (props: {
    queryables: string[],
    onSubmitGuess: (guess:string)=>void
}) => {

    const [query, setQuery] = useState('')
    const [queryable, ] = useState<string[]>(props.queryables)
    const [results, setResults] = useState<string[]>([])

    useEffect(() => {
        var res = []
        for (var q in queryable) {
            if (queryable[q].includes(query)) {
                res.push(queryable[q])
            }
        }
        setResults(res)
        console.log(results)
    }, [query, queryable])

    return <div style={{
        width: "400px"
    }}>
        <p>Search:</p>
        <input
            style={{
                width: "98%"
            }}
            onChange={e => {
                setQuery(e.target.value)
            }}
            value={query}
        />

        <div style={{
            border: "1px solid black"
        }}>
            {
                results.map((v) => {
                    return <p
                        onMouseEnter={(e:React.MouseEvent<HTMLParagraphElement>) => {e.currentTarget.style.backgroundColor = "yellow"}}
                        onMouseLeave={(e:React.MouseEvent<HTMLParagraphElement>) => {e.currentTarget.style.backgroundColor = "" }}
                        onClick={(e:React.MouseEvent<HTMLParagraphElement>) => {
                            setQuery(v)
                        }}
                    >{v}</p>
                })
            }
        </div>

        <button onClick={() => {props.onSubmitGuess(query)}}>
            Submit guess
        </button>
    </div>
}

export default SearchBar