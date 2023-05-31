import { DataProps } from "@/app/types"
import { Text, Table, TableHead, TableRow, 
    TableHeaderCell, TableBody, 
    TableCell, BadgeDelta } from "@tremor/react"

const LastRegisters: React.FC<DataProps> = ({ expenses, incomes }) => {
  
  const transactions = [...expenses, ...incomes]

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
