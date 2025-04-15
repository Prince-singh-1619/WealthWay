import React from 'react'
import { toast } from 'react-toastify'
import * as XLSX from 'xlsx'
import SummaryApi from '../helpers/SummaryApi'
// import { useSelector } from 'react-redux'

const MergeUploadedFile = (file, existingArray, setSortedEarnings, userId, array) => {
  // const {user} = useSelector(state => state.auth)
  console.log("userId", userId)
  if(!file){
      toast.warning("Please upload a proper file")
      return
  } 

  const uploadMergedData = async(data) =>{
    if (!Array.isArray(data) || data.length === 0) {
      toast.warning("No data to upload");
      return;
    }

    console.log("inside uploadMergedData")
    if(array==='expenses'){
      try {
        const response = await fetch(SummaryApi.uploadMergedExpenses.url, {
          method: SummaryApi.uploadMergedExpenses.method,
          credentials: 'include',
          headers :{
            'content-type' : "application/json"
          },
          body: JSON.stringify(data)
        })
    
        const responseData = await response.json()
        if(responseData.success){
          toast.success(responseData.message)
        }
        if(responseData.error){
          toast.error(responseData.message)
        }
      } catch (error) {
        toast.warning("Some error occurred in uploading", error)
      }
    }

    if(array==='earnings'){
      try {
        const response = await fetch(SummaryApi.uploadMergedEarnings.url, {
          method: SummaryApi.uploadMergedEarnings.method,
          credentials: 'include',
          headers :{
            'content-type' : "application/json"
          },
          body: JSON.stringify(data)
        })
    
        const responseData = await response.json()
        if(responseData.success){
          toast.success(responseData.message)
        }
        if(responseData.error){
          toast.error(responseData.message)
        }
      } catch (error) {
        toast.warning("Some error occurred in uploading", error)
      }
    }
    
  }

  const reader = new FileReader()
  reader.onload = async(e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
  
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
  
      const excelData = XLSX.utils.sheet_to_json(worksheet);
  
      // validate and format the excelData
      const formattedData = excelData.map(entry =>({
        title: entry.title || 'Untitled',
        type: entry.type || "Others",
        amount: Number(entry.amount) || 0,
        date: new Date(entry.date).toISOString().slice(0, 10),
        status: entry.status || "Pending",
        description: entry.description || '',
        ...(entry.invoice && { invoice: entry.invoice }),
        userId: userId,
      }))

      const merged = [...existingArray, ...formattedData];
      await uploadMergedData(formattedData)
  
      setSortedEarnings(merged);
      // console.log("Excel data merged successfully")
      // console.table(merged);
      // toast.success(`${formattedData.length} records merged!`);
      // alert("Excel data merged successfully")

      // toast.success("Excel data merged successfully")
      alert("Excel data merged successfully")
  };
  
  reader.readAsArrayBuffer(file);  

}

export default MergeUploadedFile