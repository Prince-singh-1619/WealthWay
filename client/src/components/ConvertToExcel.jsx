import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

const ConvertToExcel = ({array, fileName}) => {
    const validData = Array.isArray(array) ? array : [];
    if (validData.length === 0) {
        alert("No data to export.");
        return;
    }

    //remove unnecessary colums
    const removeCols = ["_id", "userId", "createdAt", "updatedAt", "__v"]
    const date = ["date"]
    const filterData = validData.map(item => {
        const filteredItem = {};
        Object.keys(item).forEach(key=>{
            if(!removeCols.includes(key)){
                let value = item[key]
                if(date.includes(key) && value && !isNaN(Date.parse(value))){
                    value = new Date(value).toISOString().split('T')[0]
                }
                filteredItem[key] = value
            }
        })
        return filteredItem
    })

    const worksheet = XLSX.utils.json_to_sheet(filterData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1")

    const excelBuffer = XLSX.write(workbook, {bookType:'xlsx', type:"array"})
    const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"})

    saveAs(blob, fileName)

}

export default ConvertToExcel