import { Expense, User } from "@prisma/client";
import { Card, Title, BarChart, Subtitle, ValueFormatter } from "@tremor/react";

interface PropsChart {
  expenses:
    | (Expense & {
        user: User;
      })[]
    | undefined;
}

const chartdata = [
    {
      name: "Amphibians",
      "Number of threatened species": 2488,
    },
    {
      name: "Birds",
      "Number of threatened species": 1445,
    },
    {
      name: "Crustaceans",
      "Number of threatened species": 743,
    },
  ];

const ExpIncMonth = ({ expenses }: PropsChart) => {

  const result: { [month: string]: number } = {};

  expenses?.forEach((entry) => {
    const createdAt = new Date(entry.createdAt);
    const month = createdAt.toLocaleString("default", { month: "long" });
    const amount = entry.amount;

    if (result[month]) {
      result[month] += amount;
    } else {
      result[month] = amount;
    }
  });

  const formattedResult = Object.keys(result).map((month) => ({
    mes: month,
    'total': Number(result[month]),
  }));

  const dataFormatter: ValueFormatter = (number: number) => {
    return "" + Intl.NumberFormat("us").format(number).toString();
  };

  return (
    <Card className="p-4">
      <Title>GASTOS POR MES</Title>
      <BarChart
      className="mt-6"
      data={formattedResult}
      index="mes"
      categories={["total"]}
      colors={["red"]}
      valueFormatter={dataFormatter}
      yAxisWidth={48}
      showLegend={false}
    />
    </Card>
  );
};

export default ExpIncMonth;
