import { TableCell, TableRow, Text, BadgeDelta, Title, Table, TableHead, TableHeaderCell, TableBody } from "@tremor/react"
import { User, Expense, Income } from "@prisma/client"
import CreateForm from "@/app/components/CreateForm"
import Modal from "@/app/components/Modal"
import { IconSquarePlus } from "@tabler/icons-react"

interface IncomeProps {
  toggleModal: () => void
  isOpen: boolean
  data:
  | (Income | Expense & {
    user: User
  })[]
  | undefined

  formType: string
  title: 'INGRESOS' | 'GASTOS'
  deltaType: 'increase' | 'decrease'
}

const TableRegisters: React.FC<IncomeProps> = ({
  toggleModal,
  isOpen,
  formType,
  deltaType,
  data,
  title
}) => {

  return (
    <>
      <Title className="flex justify-between">
        {title}
        <IconSquarePlus className="cursor-pointer p-1 rounded hover:bg-slate-50"
          onClick={toggleModal} size={32}
        />
        <Modal toggleModal={toggleModal} isOpen={isOpen}>
          <CreateForm toggleModal={toggleModal} formType={formType} />
        </Modal>
      </Title>
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
                <Text>
                  <BadgeDelta deltaType={deltaType}>{data.amount} €</BadgeDelta>
                </Text>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export default TableRegisters
