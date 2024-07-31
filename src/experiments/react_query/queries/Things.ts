import { createQueryKeys } from "@lukemorales/query-key-factory";

export const things = createQueryKeys("things", {
    byId: (id: number) => ({
        queryKey: [id],
        queryFn: async (): Promise<string> => {
            await new Promise(r => setTimeout(r, 2000))
            return `thing ${id}`
        }
    })
})