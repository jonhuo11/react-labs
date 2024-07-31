import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"
import { things } from "./queries/Things"
import { searchableByParams } from "./queries/SearchParams"

const queryClient = new QueryClient()

const ReactQueryTest = () => {
    return <QueryClientProvider client={queryClient}>
        <TestApp/>
    </QueryClientProvider>
}

const TestApp = () => {
    const thing = useQuery(things.byId(0))

    const filtered = useQuery(searchableByParams.filter({
        age: 5,
        color: "blue",
        level: 99
    }))

    if (thing.isLoading || thing.isError || filtered.isLoading || filtered.isError) {
        return <>Loading/Error</>
    } else {
        return <>{thing.data} {JSON.stringify(filtered.data)}</>
    }
}

export default ReactQueryTest