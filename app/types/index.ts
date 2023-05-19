import { Expense, Income, User } from "@prisma/client"

export interface DataProps {
    expenses:
      | (Expense & {
          user: User
        })[]
      | undefined
    incomes: | (Income & {
      user: User
    })[]
  | undefined
}


export interface IncomeProps {
  data:
  | (Income | Expense & {
    user: User
  })[]
  | undefined

  deltaType: 'increase' | 'decrease'
}