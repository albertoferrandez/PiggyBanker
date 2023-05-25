import { TableCell, TableRow, Text, BadgeDelta, Table, TableHead, TableHeaderCell, TableBody } from "@tremor/react"
import { IncomeProps } from "@/app/types"

const TableRegisters: React.FC<IncomeProps> = ({
  deltaType,
  data,
}) => {

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>DESCRIPCIÓN</TableHeaderCell>
            <TableHeaderCell>FECHA</TableHeaderCell>
            <TableHeaderCell>TOTAL</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((data) => (
            <TableRow key={data.id}>
              <TableCell>{data.description}</TableCell>
              <TableCell>
                <Text>{data.createdAt.toDateString()}</Text>
              </TableCell>
              <TableCell>
                  <BadgeDelta deltaType={deltaType}>{data.amount} €</BadgeDelta>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export default TableRegisters
