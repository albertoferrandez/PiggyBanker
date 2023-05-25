import { DataProps } from "@/app/types";
import { Card, Title, LineChart, ValueFormatter } from "@tremor/react";
import { getFormattedMonth, getFormattedDay, updateResult } from "./DataFunctions";

interface Entry {
  createdAt: string | number | Date;
  amount: number;
}

type Data = { [month: string]: { [day: string]: number } };

const ExpIncDay: React.FC<DataProps> = ({ expenses, incomes }) => {
  
  const createChartData = ( expenseEntry: any, incomeEntry: any) => {
    
    const mergedData: any[] = [];
    expenseEntry.dias.forEach((day: any) => {
      mergedData.push({
        mes: expenseEntry.mes.toLocaleUpperCase(),
        dia: day.dia,
        Gastos: day.Gastos,
        Ingresos: 0,
      });
    });

    incomeEntry?.dias.forEach((incomeDay: any) => {
      const existingData = mergedData.find(
        (data) => data.dia === incomeDay.dia
      );
      if (existingData) {
        existingData.Ingresos = incomeDay.Ingresos;
      } else {
        mergedData.push({
          mes: expenseEntry.mes.toLocaleUpperCase(),
          dia: incomeDay.dia,
          Gastos: 0,
          Ingresos: incomeDay.Ingresos,
        });
      }
    });

    return mergedData;
  };

  const calculateData = (entries: Entry[] | undefined, type: string) => {
    const result: Data = {};

    entries?.forEach((entry) => {
      const createdAt = new Date(entry.createdAt)
      const month = getFormattedMonth(createdAt)
      const day = getFormattedDay(createdAt)
      const amount = entry.amount

      updateResult(result, month, day, amount)
    })

    return Object.keys(result).map((month) => ({
      mes: month,
      dias: Object.keys(result[month]).map((day) => ({
        dia: day,
        [type]: result[month][day],
      })),
    }));
  };

  const expenseData = calculateData(expenses, "Gastos");
  const incomeData = calculateData(incomes, "Ingresos");

  const chartData = expenseData.map((expenseEntry) => {

      const incomeEntry = incomeData.find(
        (income) => income.mes === expenseEntry.mes
      )

      const mergedData = createChartData(expenseEntry, incomeEntry)
      return mergedData
    }).flat()

  const dataFormatter: ValueFormatter = (number: number) => {
    return Intl.NumberFormat("es").format(number).toString() + "€";
  }

  return (
    <Card>
      <Title className="text-sm text-center font-bold uppercase">
        GASTOS/INGRESOS POR DIA - {new Date().toLocaleString("default", { month: "long" })}
      </Title>
      <LineChart
        className="mt-6"
        data={chartData}
        index="dia"
        categories={["Gastos", "Ingresos"]}
        colors={["red", "green"]}
        valueFormatter={dataFormatter}
        yAxisWidth={40}
        showLegend={false}
      />
    </Card>
  );
};

export default ExpIncDay;
