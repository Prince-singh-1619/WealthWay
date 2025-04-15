import React from 'react';
import { Cell, Pie, PieChart, Tooltip } from 'recharts'
import groupByType from '../helpers/groupArray';
import CustomTooltip from '../helpers/CustomTooltip';

const MakePieChart = ({data}) =>{

    const categoryColorMap = {
        "Food & Essentials": "#FF6384",    // Red-pink
        "Transport": "#36A2EB",            // Sky Blue
        "Healthcare": "#4BC0C0",           // Teal
        "Entertainment": "#FFCE56",        // Yellow
        "Shopping": "#9966FF",             // Purple
        "Utilities": "#FF9F40",            // Orange
        "Housing": "#00A86B",              // Green
        "Rent": "#8B0000",                 // Dark Red
        "Education": "#B0E0E6",            // Powder Blue
        "Travel": "#C9CBCF",               // Gray
        "Others": "#FF6F61",               // Coral
        "Salary": "#FF6384",               // Red-pink
        "Freelance": "#36A2EB",            // Sky Blue
        "Business": "#4BC0C0",             // Teal
        "Investment": "#FFCE56",           // Yellow
        "Interest": "#9966FF",             // Purple
        "Gift": "#FF9F40",                 // Orange
        "Refund": "#00A86B",               // Green
        //"Rent": "#8B0000",                 // Dark Red
        "Selling": "#B0E0E6",              // Powder Blue
        "Bonus": "#C9CBCF",                // Gray
        //"Others": "#FF6F61", 


    };

    const COLORS = data.map(item => categoryColorMap[item.type]);

    const dataArray = groupByType(data) //group data by type and add amounts

    return(
        <section>
            <PieChart width={400} height={400}>
                <Pie data={dataArray} cx='50%' cy='50%' outerRadius={125} innerRadius={15} dataKey='value' label={({percent})=>`${(percent*100).toFixed(0)}%`}>
                    {
                        dataArray.map((entry, index)=>(
                            <Cell key={`cell-${index}`} fill={categoryColorMap[entry.name]} />
                        ))
                    }
                </Pie>
                <Tooltip content={<CustomTooltip/>}/>
            </PieChart>
        </section>
        
    )
}

export default MakePieChart