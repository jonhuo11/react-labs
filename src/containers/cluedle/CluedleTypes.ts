export type Race = (
    'East Asian' |
    'South Asian' |
    'European' |
    'African' |
    'Hispanic'
)

export interface Guessable {
    name: string
    race: Race
    height_cm: number
    weight_lb: number
    likes: string[]
}

export type GuessTable = Guessable[]
