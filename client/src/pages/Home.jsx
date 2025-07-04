import React, { useEffect, useState } from 'react'
import MakePieChart from '../charts/MakePieChart'
import { useSelector } from 'react-redux'
import SummaryApi from '../helpers/SummaryApi'
import { toast } from 'react-toastify'
import { FaPlus } from 'react-icons/fa'
import { Link } from 'react-router'
import MakeLineChart from '../charts/MakeLineChart'

const Home = () => {
  const [loading, setLoading] = useState(false)
  const [earningArray, setEarningArray] = useState([])
  const [expenseArray, setExpenseArray] = useState([])
  const {user} = useSelector(state => state.auth)

  // const expenseArray = [
  //   {
  //     title: "Grocery Shopping",
  //     type: "Food & Essentials",
  //     amount: 120.50,
  //     date: "2025-04-03",
  //     status: "Completed"
  //   },
  //   {
  //     title: "Fuel Refill",
  //     type: "Transport",
  //     amount: 45.75,
  //     date: "2025-04-02",
  //     status: "Pending"
  //   },
  //   {
  //     title: "Doctor's Visit",
  //     type: "Healthcare",
  //     amount: 80.00,
  //     date: "2025-04-01",
  //     status: "Completed"
  //   },
  //   {
  //     title: "Movie Bill",
  //     type: "Entertainment",
  //     amount: 65.30,
  //     date: "2025-03-30",
  //     status: "Completed"
  //   },
  //   {
  //     title: "outdoor",
  //     type: "Others",
  //     amount: 45.75,
  //     date: "2025-04-02",
  //     status: "Pending"
  //   },
  //   {
  //     title: "Birthday Gift",
  //     type: "Shopping",
  //     amount: 150.00,
  //     date: "2025-03-28",
  //     status: "Pending"
  //   },
  //   {
  //     title: "House Rent",
  //     type: "Housing",
  //     amount: 160.00,
  //     date: "2025-03-25",
  //     status: "Completed"
  //   },
  //   {
  //     title: "Internet Bill",
  //     type: "Utilities",
  //     amount: 50.00,
  //     date: "2025-03-20",
  //     status: "Completed"
  //   },
  //   {
  //     title: "Dinner at Restaurant",
  //     type: "Food & Essentials",
  //     amount: 75.20,
  //     date: "2025-04-01",
  //     status: "Completed"
  //   },
  //   {
  //     title: "Car Repair",
  //     type: "Transport",
  //     amount: 200.00,
  //     date: "2025-03-29",
  //     status: "Pending"
  //   },
  //   {
  //     title: "Pharmacy Purchase",
  //     type: "Healthcare",
  //     amount: 30.45,
  //     date: "2025-03-31",
  //     status: "Completed"
  //   },
  //   {
  //     title: "Concert Tickets",
  //     type: "Entertainment",
  //     amount: 120.00,
  //     date: "2025-03-27",
  //     status: "Completed"
  //   },
  //   {
  //     title: "New Shoes",
  //     type: "Shopping",
  //     amount: 95.99,
  //     date: "2025-04-02",
  //     status: "Pending"
  //   },
  //   {
  //     title: "Electricity Bill",
  //     type: "Housing",
  //     amount: 90.00,
  //     date: "2025-03-22",
  //     status: "Completed"
  //   },
  //   {
  //     title: "Water Bill",
  //     type: "Utilities",
  //     amount: 40.00,
  //     date: "2025-03-18",
  //     status: "Completed"
  //   },
  // ]

  // const earningArray = [
  //   {
  //     title: "Monthly Salary",
  //     type: "Salary",
  //     amount: 55000,
  //     date: "2025-04-01",
  //     status: "Received"
  //   },
  //   {
  //     title: "Freelance Web Project",
  //     type: "Freelance",
  //     amount: 15000,
  //     date: "2025-03-28",
  //     status: "Received"
  //   },
  //   {
  //     title: "Side Business Profit",
  //     type: "Business",
  //     amount: 10000,
  //     date: "2025-03-30",
  //     status: "Received"
  //   },
  //   {
  //     title: "Stock Market Return",
  //     type: "Investment",
  //     amount: 3500,
  //     date: "2025-04-02",
  //     status: "Received"
  //   },
  //   {
  //     title: "Bank Interest",
  //     type: "Interest",
  //     amount: 1200,
  //     date: "2025-04-03",
  //     status: "Pending"
  //   },
  //   {
  //     title: "Birthday Gift",
  //     type: "Gift",
  //     amount: 2000,
  //     date: "2025-03-21",
  //     status: "Received"
  //   },
  //   {
  //     title: "Product Refund",
  //     type: "Refund",
  //     amount: 799,
  //     date: "2025-03-27",
  //     status: "Received"
  //   },
  //   {
  //     title: "Flat Rent Received",
  //     type: "Rent",
  //     amount: 9000,
  //     date: "2025-04-01",
  //     status: "Received"
  //   },
  //   {
  //     title: "Old Laptop Sold",
  //     type: "Selling",
  //     amount: 18000,
  //     date: "2025-03-25",
  //     status: "Received"
  //   },
  //   {
  //     title: "Performance Bonus",
  //     type: "Bonus",
  //     amount: 5000,
  //     date: "2025-03-31",
  //     status: "Received"
  //   },
  //   {
  //     title: "Other Misc Income",
  //     type: "Others",
  //     amount: 250,
  //     date: "2025-04-02",
  //     status: "Received"
  //   }
  // ]

    
    
  console.log("userId: ", user.userId)
    const fetchExpenseArray = async() =>{
      try {
        console.log("userId: ", user.userId)
        const response = await fetch(`${SummaryApi.fetchExpenses.url}?userId=${user.userId}` ,{
          method: SummaryApi.fetchExpenses.method,
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`, //added after cookie removal
            "content-type" : "application/json",
          },
          // body: JSON.stringify({userId: user.userId})
        })
        const responseData = await response.json()
        console.log("response done ")
      
        if(responseData.success){
          setExpenseArray(responseData.data)
          // alert("data fetch success")
        }
        if(responseData.error){
          toast.error("Some error occurred in backend", responseData.error)
        }
  
      } catch (error) {
       toast.error("Some error occurred while fetch expenses", error) 
      }
    }
    const fetchEarningArray = async() =>{
      try {
        console.log("userId: ", user.userId)
        const response = await fetch(`${SummaryApi.fetchEarnings.url}?userId=${user.userId}` ,{
          method: SummaryApi.fetchEarnings.method,
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`, //added after cookie removal
            "content-type" : "application/json",
          },
          // body: JSON.stringify({userId: user.userId})
        })
        const responseData = await response.json()
        console.log("response done ")
      
        if(responseData.success){
          setEarningArray(responseData.data)
          // alert("data fetch success")
        }
        if(responseData.error){
          toast.error("Some error occurred in backend", responseData.error)
        }
  
      } catch (error) {
       toast.error("Some error occurred while fetch earnings", error) 
      }
    }
  
    useEffect(()=>{
      const handleLoading = async () => {
        setLoading(true);
        await fetchExpenseArray();
        await fetchEarningArray();
        setLoading(false);
      };
      handleLoading();
    }, [])

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