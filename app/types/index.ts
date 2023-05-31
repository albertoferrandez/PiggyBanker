import { Expense, Income, User } from "@prisma/client"

export interface DataProps {
  expenses: Expense[] | undefined
  incomes: Income [] | undefined;
}


export interface IncomeProps {
  data: (Income | (Expense & { user: User }))[] | undefined;
  deltaType: 'increase' | 'decrease';
}