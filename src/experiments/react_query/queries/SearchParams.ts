import { createQueryKeys } from "@lukemorales/query-key-factory";

type SearchParamColor = "red" | "blue"

interface SearchParams {
    age: number
    color: SearchParamColor
    level: number
}

export const searchableByParams = createQueryKeys("searchableByParams", {
    filter: (filters: SearchParams) => ({
        queryKey: [{...filters}],
        queryFn: async () => {
            await new Promise(r => setTimeout(r, 5000))
            return {
                name: "Someone",
                age: filters.age,
                color: filters.color,
                level: filters.level
            }
        }
    })
})