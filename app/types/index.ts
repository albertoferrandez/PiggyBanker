import { User } from "@prisma/client"

export type ExpenseType = {
    id: string
    description: string
    amount: number
    createdat: Date
    userId: string
    user: User
}