import React, { useEffect, useState } from 'react'
import MakePieChart from '../charts/MakePieChart'
import { useSelector } from 'react-redux'
import SummaryApi from '../helpers/SummaryApi'
import { toast } from 'react-toastify'
import { FaPlus } from 'react-icons/fa'
import { Link } from 'react-router'
import MakeLineChart from '../charts/MakeLineChart'

const Home = ({loading, expenseList, earningList}) => {
  // const [loading, setLoading] = useState(false)
  const {user} = useSelector(state => state.auth)
  
  const [expenseArray, setExpenseArray] = useState([])
  const [earningArray, setEarningArray] = useState([])
  useEffect(()=>{
    setExpenseArray(expenseList)
    setEarningArray(earningList)
  },[expenseList, earningList])

  console.log("userId: ", user?.userId)
  // const fetchExpenseArray = async() =>{
  //   try {
  //     console.log("userId: ", user.userId)
  //     const response = await fetch(`${SummaryApi.fetchExpenses.url}?userId=${user.userId}` ,{
  //       method: SummaryApi.fetchExpenses.method,
  //       credentials: 'include',
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("authToken")}`, //added after cookie removal
  //         "content-type" : "application/json",
  //       },
  //       // body: JSON.stringify({userId: user.userId})
  //     })
  //     const responseData = await response.json()
  //     console.log("response done ")
    
  //     if(responseData.success){
  //       setExpenseArray(responseData.data)
  //       // alert("data fetch success")
  //     }
  //     if(responseData.error){
  //       toast.error("Some error occurred in backend", responseData.error)
  //     }

  //   } catch (error) {
  //    toast.error("Some error occurred while fetch expenses", error) 
  //   }
  // }
  // const fetchEarningArray = async() =>{
  //   try {
  //     console.log("userId: ", user.userId)
  //     const response = await fetch(`${SummaryApi.fetchEarnings.url}?userId=${user.userId}` ,{
  //       method: SummaryApi.fetchEarnings.method,
  //       credentials: 'include',
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("authToken")}`, //added after cookie removal
  //         "content-type" : "application/json",
  //       },
  //       // body: JSON.stringify({userId: user.userId})
  //     })
  //     const responseData = await response.json()
  //     console.log("response done ")
    
  //     if(responseData.success){
  //       setEarningArray(responseData.data)
  //       // alert("data fetch success")
  //     }
  //     if(responseData.error){
  //       toast.error("Some error occurred in backend", responseData.error)
  //     }

  //   } catch (error) {
  //    toast.error("Some error occurred while fetch earnings", error) 
  //   }
  // }

  // useEffect(()=>{
  //   const handleLoading = async () => {
  //     setLoading(true);
  //     await fetchExpenseArray();
  //     await fetchEarningArray();
  //     setLoading(false);
  //   };
  //   handleLoading();
  // }, [])

  const categoryColorMap = [
    { expenseCategory: "Food & Essentials", earningCategory: "Salary", color: "#FF6384" },    // Red-pink
    { expenseCategory: "Transport", earningCategory: "Freelance", color: "#36A2EB" },            // Sky Blue
    { expenseCategory: "Healthcare", earningCategory: "Business", color: "#4BC0C0" },           // Teal
    { expenseCategory: "Entertainment", earningCategory: "Investment", color: "#FFCE56" },        // Yellow
    { expenseCategory: "Shopping", earningCategory: "Interest", color: "#9966FF" },             // Purple
    { expenseCategory: "Utilities", earningCategory: "Gift", color: "#FF9F40" },            // Orange
    { expenseCategory: "Housing", earningCategory: "Refund", color: "#00A86B" },              // Green
    { expenseCategory: "Rent", earningCategory: "Rent", color: "#8B0000" },                 // Dark Red
    { expenseCategory: "Education", earningCategory: "Selling", color: "#B0E0E6" },            // Powder Blue
    { expenseCategory: "Travel", earningCategory: "Bonus", color: "#C9CBCF" },               // Gray
    { expenseCategory: "Others", earningCategory: "Others", color: "#FF6F61"  }               // Coral
  ]

  const loadingArray = new Array(11).fill(null)

  return (
    <section className="w-full p-4 text-base sm:text-xl">
      {/* Expenses & Earning Pie Charts */}
      <section className="flex flex-col lg:flex-row justify-between gap-4 px-0 sm:px-4">
        
        {/* Expenses pie-chart */}
        <div className="w-full p-2 bg-[#333333] rounded-2xl">
          <span className="text-slate-400">Expenses: </span>
          {loading ? (
            <div className="flex flex-col sm:flex-row px-4 gap-4 items-center animate-pulse">
              <div className="h-40 w-40 sm:h-72 sm:w-72 rounded-full btn-bg"></div>
              <div className="flex flex-col gap-2">
                {loadingArray.map((_, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <i className="w-5 h-5 rounded-full btn-bg"></i>
                    <span className="w-32 h-5 rounded btn-bg"></span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center sm:-mt-6 sm:px-10 relative">
              <MakePieChart data={expenseArray} />
              {expenseArray.length === 0 && (
                <div className="opacity-50 text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  Nothing to display, <br /> try adding Something.
                </div>
              )}
              <div className="max-sm:w-full flex flex-col gap-2 max-sm:flex-row max-sm:flex-wrap mt-4 max-sm:pb-4">
                {categoryColorMap.map((entry, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span
                      className="inline-block w-4 h-4 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    ></span>
                    <span className="text-sm text-gray-200">{entry.expenseCategory}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Earning pie-chart */}
        <div className="w-full p-2 bg-[#333333] rounded-2xl">
          <span className="text-slate-400">Earning: </span>
          {loading ? (
            <div className="flex flex-col sm:flex-row px-4 gap-4 items-center animate-pulse">
              <div className="h-40 w-40 sm:h-72 sm:w-72 rounded-full btn-bg"></div>
              <div className="flex flex-col gap-2">
                {loadingArray.map((_, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <i className="w-5 h-5 rounded-full btn-bg"></i>
                    <span className="w-32 h-5 rounded btn-bg"></span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center sm:-mt-6 sm:px-10 relative">
              <MakePieChart data={earningArray} />
              {earningArray.length === 0 && (
                <div className="opacity-50 text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  Nothing to display, <br /> try adding Something.
                </div>
              )}
              <div className="max-sm:w-full flex flex-col gap-2 max-sm:flex-row max-sm:flex-wrap mt-4 max-sm:pb-4">
                {categoryColorMap.map((entry, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span
                      className="inline-block w-4 h-4 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    ></span>
                    <span className="text-sm text-gray-200">{entry.earningCategory}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Quick access buttons */}
      <section className="mt-4 px-0 sm:px-4">
        <div className="w-full p-2 bg-[#333333] rounded-2xl">
          <span className="text-slate-400">Quick access: </span>
          <div className="flex flex-col sm:flex-row justify-around gap-2 p-2">
            <Link to="/new-expense" className="btn btn-bg btn-minus flex gap-2 items-center justify-center">
              <i><FaPlus /></i>
              <p>New Expense</p>
            </Link>
            <Link to="/new-earning" className="btn btn-bg btn-plus flex gap-2 items-center justify-center">
              <i><FaPlus /></i>
              <p>New Earning</p>
            </Link>
            {/* <Link to="/" className="btn btn-bg btn-plus flex gap-2 items-center justify-center">
              <i><FaPlus /></i>
              <p>Create Trip</p>
            </Link> */}
          </div>
        </div>
      </section>

      {/* Line chart */}
      <section className="mt-4 px-0 sm:px-4">
        <div className="w-full p-2 bg-[#333333] rounded-2xl relative min-h-[200px]">
          {loading ? (
            <div className="w-full h-72 btn-bg animate-pulse rounded-2xl"></div>
          ) : (
            <div>
              <MakeLineChart expenses={expenseArray} earnings={earningArray} />
              {(expenseArray.length === 0 || earningArray.length === 0) && (
                <div className="opacity-50 text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  Nothing to display, try adding Something.
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </section>
  )
}

export default Home