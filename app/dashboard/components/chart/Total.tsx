import { DataProps } from '@/app/types'
import { Grid, Card, Flex, BadgeDelta, Metric, Text } from '@tremor/react'
import React from 'react'

const Total: React.FC<DataProps> = ({ expenses, incomes }) => {

    const getTotalofData = (data: any[] | undefined) => {
        return data?.reduce((acc, exp) => exp.amount + acc, 0)
    }

    const totalExpenses = getTotalofData(expenses)
    const totalIncomes = getTotalofData(incomes)
    const balance = totalExpenses - totalIncomes

    return (
        <>
            <Card className='w-full md:w-2/3 md:mx-auto mx-0' decoration="top" decorationColor="cyan">
                <Flex alignItems="start">
                    <Text className='text-xs font-bold'>BALANCE</Text>
                    <BadgeDelta 
                        deltaType={
                            balance > 0 ? 'increase' : 'decrease'
                        } 
                    />
                </Flex>
                <Flex
                    justifyContent="start"
                    alignItems="baseline"
                    className="truncate space-x-3"
                >
                    <Metric className={balance > 0 ? 'text-green-400' : 'text-red-400'}>
                        {balance} €
                    </Metric>
                </Flex>
            </Card>

            <Card className='w-full md:w-2/3 md:mx-auto mx-0 mt-4' decoration="top" decorationColor="green">
                <Flex alignItems="start">
                    <Text className='text-xs font-bold'>INGRESOS</Text>
                    <BadgeDelta deltaType={'increase'} />
                </Flex>
                <Flex
                    justifyContent="start"
                    alignItems="baseline"
                    className="truncate space-x-3"
                >
                    <Metric className='text-green-400'>{totalIncomes} €</Metric>
                </Flex>
            </Card>

            <Card className='w-full md:w-2/3 md:mx-auto mx-0 mt-4' decoration="top" decorationColor="red">
                <Flex alignItems="start">
                    <Text className='text-xs font-bold'>GASTOS</Text>
                    <BadgeDelta deltaType={'decrease'} />
                </Flex>
                <Flex
                    justifyContent="start"
                    alignItems="baseline"
                    className="truncate space-x-3"
                >
                    <Metric className='text-red-400'>{totalExpenses} €</Metric>
                </Flex>
            </Card>
        </>
    )
}

export default Total
