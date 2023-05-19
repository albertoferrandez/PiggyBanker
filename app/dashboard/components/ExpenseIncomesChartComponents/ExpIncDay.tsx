import { DataProps } from '@/app/types'
import { Card, Title, LineChart, ValueFormatter } from '@tremor/react'



const ExpIncDay: React.FC<DataProps> = ({ expenses, incomes }) => {
        /**
         * Esta función recibe dos parametros, un array con los ingresos o los gastos
         * y el type que es el tipo de dato, se hace para que el chart reciba un objeto
         */

    const calculateData = (entries: any[] | undefined, type: string) => {
       /**
        * result es una variable que es un objeto que tiene el mes y el dia 
        */
        const result: { [month: string]: { [day: string]: number } } = {}

        /**
         * llegan los datos se recorre cada elemento del array entries y se ejecuta una 
         * función de devolución de llamada para cada elemento. Cada elemento se asigna a la variable entry, 
         * que debe tener una propiedad createdAt de tipo cadena, 
         * número o fecha, y una propiedad amount de cualquier tipo.
         */
      
        entries?.forEach((entry: { createdAt: string | number | Date, amount: any }) => {
          const createdAt = new Date(entry.createdAt)
          const month = createdAt.toLocaleString("default", { month: "long" })
          const day = createdAt.toLocaleString('es-ES', { weekday: 'long', day: 'numeric' })
          const amount = entry.amount
      
          /**
           * En esta sección se realiza la acumulación de datos en el objeto result. 
           * Se verifica si ya existe una entrada para el mes actual (month) en result.
           *  Si existe, se verifica si ya existe una entrada para el día actual (day). 
           * Si también existe, se suma el valor actual de amount al valor existente. 
           * Si no existe una entrada para el día actual, 
           * se crea una nueva entrada con el valor de amount. 
           * Si no existe una entrada para el mes actual, 
           * se crea una nueva entrada en result con el día actual y el valor de amount.
           */
          if (result[month]) {
            if (result[month][day]) {
              result[month][day] += amount
            } else {
              result[month][day] = amount
            }
          } else {
            result[month] = { [day]: amount }
          }
        })

        /**
         * Aquí se realiza la transformación final de result en un formato de array de objetos.
         * Se obtienen las claves (meses) de result utilizando Object.keys(result), 
         * luego se aplica el método map() para cada clave (month). 
         * Dentro de la función de mapeo, se crea un objeto con dos propiedades: 
         * mes (asignada con el valor de month) y dias. 
         * La propiedad dias contiene otro array de objetos que se obtiene al iterar 
         * sobre las claves de result[month] utilizando Object.keys(result[month]). 
         * Para cada clave (day), se crea un objeto con una propiedad dia 
         * (asignada con el valor de day) y una propiedad dinámica ([type]) 
         * que se asigna con el valor correspondiente de result[month][day].
         */
      
        return Object.keys(result).map((month) => ({
          mes: month,
          dias: Object.keys(result[month]).map((day) => ({
            dia: day,
            [type]: result[month][day],
          })),
        }))
      }
      
      const expenseData = calculateData(expenses, 'Gastos')
      const incomeData = calculateData(incomes, 'Ingresos')
      
      /**
       * Aquí se crea una variable chartData que contiene los datos combinados de 
       * expenseData e incomeData. Se utiliza el método flatMap() en expenseData para 
       * recorrer cada elemento (expenseEntry) y aplicar una función de mapeo. 
       * Para cada expenseEntry, se busca la entrada correspondiente en incomeData 
       * utilizando find(), y se asigna a la variable incomeEntry. 
       * Luego se crea un nuevo array de objetos (mergedData) utilizando el método map() 
       * en expenseEntry.dias, que representa los días de expenseEntry. 
       * Cada objeto en mergedData tiene propiedades como mes, dia, Gastos 
       * (obtenidos de expenseEntry.dias), e Ingresos inicializado en 0. 
       * Después, se recorre cada día en incomeEntry?.dias utilizando forEach(). 
       * Se busca si ya existe un objeto en mergedData con el mismo día utilizando find(). 
       * Si existe, se actualiza la propiedad Ingresos con el valor correspondiente de incomeDay.Ingresos. 
       * Si no existe, se agrega un nuevo objeto a mergedData con las propiedades mes, dia, 
       * Gastos inicializado en 0, y Ingresos con el valor correspondiente de incomeDay.Ingresos. 
       * Finalmente, se devuelve mergedData.
       */
      const chartData = expenseData.flatMap((expenseEntry) => {
        const incomeEntry = incomeData.find((income) => income.mes === expenseEntry.mes)
      
        const mergedData = expenseEntry.dias.map((day) => ({
          mes: expenseEntry.mes.toLocaleUpperCase(),
          dia: day.dia,
          Gastos: day.Gastos,
          Ingresos: 0,
        }))
      
        incomeEntry?.dias.forEach((incomeDay) => {
          const existingData = mergedData.find((data) => data.dia === incomeDay.dia)
          if (existingData) {
            existingData.Ingresos = incomeDay.Ingresos
          } else {
            mergedData.push({
              mes: expenseEntry.mes.toLocaleUpperCase(),
              dia: incomeDay.dia,
              Gastos: 0,
              Ingresos: incomeDay.Ingresos,
            })
          }
        })
      
        return mergedData
      })
      
    const dataFormatter: ValueFormatter = (number: number) => {
        return Intl.NumberFormat("es").format(number).toString() + "€"
    }
    return (
        <Card>
            <Title className="text-sm text-center font-bold">GASTOS/INGRESOS POR DIA</Title>
            <LineChart
                className="mt-6"
                data={chartData}
                index="dia"
                categories={['Gastos', 'Ingresos']}
                colors={['red', 'green']}
                valueFormatter={dataFormatter}
                yAxisWidth={40}
                showLegend={false}
            />
        </Card>
    )
}

export default ExpIncDay
