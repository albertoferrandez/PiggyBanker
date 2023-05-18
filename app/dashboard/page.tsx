
import { getExpenses } from "../actions/getExpenses"
import { getIncomes } from "../actions/getIncomes"
import HeaderDashboard from "./components/HeaderDashboard"
import TableDashboard from "./components/TableDashboard"

export default async function Page() {

  const expenses = await getExpenses()
  const incomes = await getIncomes()
  
  return (
    <main className="bg-slate-50 p-6 sm:p-10 min-h-screen">  
      <HeaderDashboard />
      <TableDashboard expenses={expenses} incomes={incomes}/>
    </main>
  )
}
