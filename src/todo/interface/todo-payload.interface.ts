export interface TodoPayload {
    id?: number
    title: string
    description: string
    created: Date
    updated: Date
    userId?: number
}