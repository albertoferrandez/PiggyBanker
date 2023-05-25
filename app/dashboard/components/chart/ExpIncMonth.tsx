import { DataProps } from "@/app/types"
import { Card, Title, BarChart, ValueFormatter } from "@tremor/react"

const ExpIncMonth:React.FC<DataProps> = ({ expenses, incomes }) => {

  const calculateData = (entries: any[] | undefined, type: string) => {
    const result: { [month: string]: number } = {}
  
    entries?.forEach((entry: { createdAt: string | number | Date, amount: any }) => {
      const createdAt = new Date(entry.createdAt)
      const month = createdAt.toLocaleString("default", { month: "long" })
      const amount = entry.amount
  
      if (result[month]) {
        result[month] += amount
      } else {
        result[month] = amount
      }
    })
  
    return Object.keys(result).map((month) => ({
      mes: month,
      [type]: Number(result[month]),
    }))
  }
  
  const expenseData = calculateData(expenses, 'Gastos')
  const incomeData = calculateData(incomes, 'Ingresos')

  const chartData = expenseData.map((expenseEntry, index) => ({
    mes: expenseEntry.mes.toLocaleUpperCase(),
    Gastos: expenseEntry.Gastos,
    Ingresos: incomeData[index].Ingresos,
  }))

  const dataFormatter: ValueFormatter = (number: number) => {
    return Intl.NumberFormat("es").format(number).toString() + "€"
  }

  return (
    <Card className="p-4">
      <Title className="text-sm text-center font-bold">GASTOS/INGRESOS POR MES</Title>
      <BarChart
      className="mt-6"
      data={chartData}
      index="mes"
      categories={["Gastos", "Ingresos"]}
      colors={["red", "green"]}
      valueFormatter={dataFormatter}
      yAxisWidth={40}
      showLegend={false}
    />
    </Card>
  )
}

export default ExpIncMonth
