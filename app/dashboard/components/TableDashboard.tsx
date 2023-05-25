"use client"

import { TabList, Grid, Card, Tab, Title } from "@tremor/react"
import { useState } from "react"
import ExpIncMonth from "./chart/ExpIncMonth"
import TableRegisters from "./TableRegisters"
import { DataProps } from "@/app/types"
import ExpIncDay from "./chart/ExpIncDay"
import CreateForm from "@/app/components/CreateForm"
import Modal from "@/app/components/Modal"
import { IconSquarePlus } from "@tabler/icons-react"
import Total from "./chart/Total"

const TableDashboard: React.FC<DataProps> = ({ expenses, incomes }) => {
  const [selectedView, setSelectedView] = useState("1")

  const [isExpenseModalOpen, setExpenseModalOpen] = useState(false)
  const [isIncomeModalOpen, setIncomeModalOpen] = useState(false)

  const toggleExpenseModal = () => {
    setExpenseModalOpen(!isExpenseModalOpen)
  }

  const toggleIncomeModal = () => {
    setIncomeModalOpen(!isIncomeModalOpen)
  }

  return (
    <>
      <TabList
        defaultValue="1"
        onValueChange={(value) => setSelectedView(value)}
        className="mt-6"
      >
        <Tab value="1" text="GENERAL" />
        <Tab value="2" text="REGISTROS" />
      </TabList>

      {selectedView === "1" ? (
        <>
          <Grid numColsLg={3} className="mt-6 gap-6">
            <Card>
              <div className="h-auto">
                <ExpIncMonth expenses={expenses} incomes={incomes} />
              </div>
            </Card>
            <Card>
              <div className="h-auto">
                <ExpIncDay expenses={expenses} incomes={incomes} />
              </div>
            </Card>
            <Card>
              <div className="h-auto">
                <Total expenses={expenses} incomes={incomes}/>
              </div>
            </Card>
          </Grid>

          <div className="mt-6">
            <Card>
              <div className="h-80" />
            </Card>
          </div>
        </>
      ) : (
        <Card className="mt-6">
          <div className="h-auto">
            <Grid numColsLg={2} numColsMd={2} className="mt-6 gap-6">
              <Card>
                <Title className="flex justify-between">
                  GASTOS
                  <IconSquarePlus
                    className="cursor-pointer p-1 rounded hover:bg-slate-50"
                    onClick={toggleExpenseModal}
                    size={32}
                  />
                  <Modal toggleModal={toggleExpenseModal} isOpen={isExpenseModalOpen}>
                    <CreateForm toggleModal={toggleExpenseModal} formType={'expense'} />
                  </Modal>
                </Title>
                <TableRegisters
                  data={expenses}
                  deltaType="decrease"
                />
              </Card>
              <Card>
                <Title className="flex justify-between">
                  INGRESOS
                  <IconSquarePlus
                    className="cursor-pointer p-1 rounded hover:bg-slate-50"
                    onClick={toggleIncomeModal}
                    size={32}
                  />
                  <Modal toggleModal={toggleIncomeModal} isOpen={isIncomeModalOpen}>
                    <CreateForm toggleModal={toggleIncomeModal} formType={'income'} />
                  </Modal>
                </Title>
                <TableRegisters
                  data={incomes}
                  deltaType="increase"
                />
              </Card>
            </Grid>
          </div>
        </Card>
      )}
    </>
  )
}

export default TableDashboard
