import React from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const MakeLineChart = ({expenses, earnings}) => {
    
    const mergeDataForChart = (expenses, earnings) =>{
        const combinedMap = new Map()

        expenses.forEach(item => {
            const date = new Date(item.date).toISOString().split('T')[0]
            if(!combinedMap.has(date)){
                combinedMap.set(date, {date, expense:item.amount, earning:0})
            }else{
                combinedMap.get(date).expense = item.amount
            }
        })

        earnings.forEach(item => {
            const date = new Date(item.date).toISOString().split('T')[0]
            if(!combinedMap.has(date)){
                combinedMap.set(date, {date, expense:0, earning:item.amount})
            }else{
                combinedMap.get(date).earning = item.amount
            }
        })

        return Array.from(combinedMap.values()).sort((a,b) => new Date(a.date)-new Date(b.date))
    }

    const chartData = mergeDataForChart(expenses, earnings)


  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={chartData} margin={{ top: 30, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="1 1" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="earning" stroke="#22c55e" name="Earning" />
        <Line type="monotone" dataKey="expense" stroke="#ef4444" name="Expense" />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default MakeLineChart