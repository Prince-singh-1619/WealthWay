import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import './App.css'
import Home from './pages/Home'
import Expense from './pages/Expense'
// import Trips from './pages/Trips'
import Earnings from './pages/Earnings'
import MyProfile from './pages/MyProfile'
import Support from './pages/Support'
import Navbar from './components/Navbar'
import NewExpense from './pages/NewExpense';
import NewEarning from './pages/NewEarning';
import ProtectedRoute from './helpers/ProtectedRoute';
import PublicOnlyRoute from './helpers/PublicOnlyRoute ';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { toast, ToastContainer } from 'react-toastify';
import EditProfile from './pages/EditProfile';
import ShowDescription from './helpers/ShowDescription';
import { useSelector } from 'react-redux';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import { useEffect, useState } from 'react';
import SummaryApi from './helpers/SummaryApi';

const Layout = () => {
  const sidebar = useSelector(state => state.navData.showSidebar);  
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Navbar/>
      <main style={{ flex: 1 }} className={`max-md:ml-14 transition-all duration-800  ${sidebar ? 'ml-54' : 'ml-14'}`}>
        <Outlet/>
      </main>
    </div>
  )
};

function App() {
  // const isLoggedIn = localStorage.getItem("authToken");

  const {user} = useSelector(state => state.auth)
  const [loading, setLoading] = useState(false)
  const [expenseArray, setExpenseArray] = useState([])
  const [earningArray, setEarningArray] = useState([])
  
  const fetchExpenseArray = async() =>{
    try {
      console.log("userId: ", user.userId)
      const response = await fetch(`${SummaryApi.fetchExpenses.url}?userId=${user.userId}` ,{
        method: SummaryApi.fetchExpenses.method,
        // credentials: 'include',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`, //added after cookie removal
          "content-type" : "application/json",
        },
        // body: JSON.stringify({userId: user.userId})
      })
      const responseData = await response.json()
      console.log("response done ")
    
      if(responseData.success){
        // setExpenseArray(responseData.data)
        // alert("data fetch success")
        const reversedArray = responseData.data.slice().reverse();
        setExpenseArray(reversedArray)

        const totalExpense = responseData.data.reduce((acc, item) => acc + item.amount, 0);
        localStorage.setItem("totalExpense", JSON.stringify(totalExpense))
      }
      if(responseData.error){
        toast.error("Some error occurred in backend", responseData.error)
        console.log(responseData.error)
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
        // credentials: 'include',
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
        const totalEarning = responseData.data.reduce((acc, item) => acc + item.amount, 0);
        localStorage.setItem("totalEarning", JSON.stringify(totalEarning))
      }
      if(responseData.error){
        toast.error("Some error occurred in backend", responseData.error)
      }

    } catch (error) {
      toast.error("Some error occurred while fetch earnings", error) 
    }
  }

  useEffect(()=>{
    // if(!isLoggedIn) return;
    const handleLoading = async () => {
      setLoading(true);
      await Promise.all( [fetchExpenseArray(), fetchEarningArray()] )
      setLoading(false);
    };
    handleLoading();
  }, [])

  return (
    <Router >
      <ToastContainer position="top-center"/>
      <Routes>
        <Route path="/login" element={<PublicOnlyRoute> <Login/> </PublicOnlyRoute>}/>
        <Route path="/signup" element={<PublicOnlyRoute> <SignUp/> </PublicOnlyRoute>}/>
        <Route path="/forgot-password" element={<PublicOnlyRoute> <ForgotPassword/> </PublicOnlyRoute>}/>
        <Route path="/reset-password/:token" element={<PublicOnlyRoute> <ResetPassword/> </PublicOnlyRoute>}/>
        
        <Route className='max-md:ml-14' element={<ProtectedRoute> <Layout/> </ProtectedRoute>} >
          <Route path="/" element={ 
            <ProtectedRoute>
              <Home loading={loading} expenseList={expenseArray} earningList={earningArray}/>
            </ProtectedRoute>} 
          />
          <Route path="/expense" element={<Expense/>} />
          {/* <Route path="/trips" element={<Trips/>} /> */}
          <Route path="/earnings" element={<Earnings />}/>
          <Route path="/my-profile" element={<MyProfile/>} />
          <Route path="/support" element={<Support/>} />
          <Route path="/new-expense" element={<NewExpense/>} />
          <Route path="/new-earning" element={<NewEarning/>} />
          <Route path="/edit-profile" element={<EditProfile/>} />
          {/* <Route path="/show" element={<ShowDescription/>} /> */}
        </Route>

      </Routes>
    </Router>
  )
}

export default App
