"use client"

import { User, Expense } from "@prisma/client"
import { TabList, Grid, Card, Tab } from "@tremor/react"
import { useState } from "react"
import ExpIncMonth from "./ExpenseIncomesChartComponents/ExpIncMonth"
import TableRegisters from "./Table"

interface TableProps {
    expenses: (Expense & {
        user: User;
    })[] | undefined
    incomes: (Expense & {
      user: User;
  })[] | undefined
}

const TableDashboard: React.FC<TableProps> = ({ expenses, incomes }) => {
  const [selectedView, setSelectedView] = useState("1")

  const [isOpen, setIsOpen] = useState(false)

  const toggleModal = () => {
    setIsOpen(!isOpen)
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
                <ExpIncMonth expenses={expenses}/>
              </div>
            </Card>
            <Card>
              <div className="h-28" />
            </Card>
            <Card>
              <div className="h-28" />
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
          <div className="h-96">
            <Grid numColsLg={2} numColsMd={2} className="mt-6 gap-6">
              <Card>
                  <TableRegisters
                      toggleModal={toggleModal} 
                      isOpen={isOpen} 
                      data={expenses}
                      formType="expense"
                      title="GASTOS"
                      deltaType="decrease"
                  />
              </Card>
              <Card>
                <TableRegisters
                      toggleModal={toggleModal} 
                      isOpen={isOpen} 
                      data={incomes}
                      formType="income"
                      title="INGRESOS"
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
