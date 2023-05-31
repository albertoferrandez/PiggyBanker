import { DataProps } from "@/app/types"
import { Expense, Income } from "@prisma/client"
import { Text, Table, TableHead, TableRow, 
    TableHeaderCell, TableBody, 
    TableCell, BadgeDelta } from "@tremor/react"

const LastRegisters: React.FC<DataProps> = ({ expenses, incomes }) => {
  
  const expenseList: Expense[] = expenses || []
  const incomeList: Income[] = incomes || []

  const transactions = [...expenseList, ...incomeList]

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>DESCRIPCIÓN</TableHeaderCell>
          <TableHeaderCell>FECHA</TableHeaderCell>
          <TableHeaderCell>TOTAL</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {transactions?.slice(0, 10).map((data) => (
          <TableRow key={data.id}>
            <TableCell>{data.description}</TableCell>
            <TableCell>
              <Text>{data.createdAt.toDateString()}</Text>
            </TableCell>
            <TableCell>
              {data.amount}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default LastRegisters
