import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import {toast} from 'react-toastify'
import { logout } from '../store/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import defaultUserImg from '../assets/user.png'
import { IoCloseSharp } from 'react-icons/io5'
import DeleteAccount from '../components/DeleteAccount'
import SummaryApi from '../helpers/SummaryApi'

const MyProfile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showDeleteBox, setShowDeleteBox] = useState(false)
  const {user} = useSelector((state) => state.auth)

  const [expenseArray, setExpenseArray] = useState([])
  const [earningArray, setEarningArray] = useState([])
  const [loading, setLoading] = useState()

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
        console.log("earningArray", earningArray)
        // alert("data fetch success")
      }
      if(responseData.error){
        toast.error("Some error occurred in backend", responseData.error)
      }

    } catch (error) {
     toast.error("Some error occurred while fetch earnings", error) 
    }
  }
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
        // setExpenseArray(responseData.data)
        // alert("data fetch success")
        const reversedArray = responseData.data.slice().reverse();
        setExpenseArray(reversedArray)
      }
      if(responseData.error){
        toast.error("Some error occurred in backend", responseData.error)
      }

    } catch (error) {
     toast.error("Some error occurred while fetch expenses", error) 
    }
  }

  useEffect(()=>{
    const handleLoading = async () => {
      setLoading(true);
      await fetchEarningArray();
      await fetchExpenseArray();
      setLoading(false);
    };
    handleLoading();
  }, [])

  // let totalExpense = 0
  // expenseArray.forEach((item) =>{
  //   totalExpense += item.amount
  // })
  // let totalEarning = 0
  // earningArray.forEach((item)=>{
  //   totalEarning += item.amount
  // })

  const totalExpense = expenseArray.reduce((acc, item) => acc + item.amount, 0);
  const totalEarning = earningArray.reduce((acc, item) => acc + item.amount, 0);

  const handleLogout = async() =>{
    const response = await fetch(SummaryApi.logout.url, {
      method: SummaryApi.logout.method,
      credentials: 'include'
    })
    const data = await response.json()
    if(data.success){
      toast.success(data.message)
      localStorage.clear()
      dispatch(logout())
      navigate("/login")
    }
    if(data.error){
      toast.error(data.message)
      toast.warning("Error logging out")
      console.log("Error logging out", data.error)
    }


    // try {
    //   localStorage.clear()
    //   dispatch(logout())
    //   navigate('/login')
    // } catch (error) {
    //   toast.warning("Error logging out")
    //   console.log("Error logging out", error)
    // }
  }


  return (
    <div className='w-full  p-4'>
      <section className=''>
        <div className='flex justify-between items-center'>
          <h2 className='color-plus font-bold'>My Profile</h2>
          {/* <Link to='/' className='w-8 h-8 btn btn-bg btn-minus flex justify-center items-center rounded mt-2'>
            <span> <IoCloseSharp/> </span>
          </Link> */}
          <button className='btn btn-bg btn-minus' onClick={handleLogout}>Logout</button>
        </div>

      </section>
      <div className='w-full h-[0.5px] bg-slate-600 mt-4'></div>

      {/* edit profile */}
      <section className='flex max-lg:flex-col max-lg:gap-4 max-lg:items-center mt-4 justify-around max-md:justify-center max-md:items-center'>
        <div className='w-fit max-md:w-[90%] p-4  flex flex-col items-center justify-around gap-4 bg-[#333333] rounded-2xl '>
          <div className='flex max-md:flex-col  items-center gap-4'>
            <div className='w-56 h-56 rounded-full border-[1px] overflow-hidden'>
              <img src={user?.profilePic || defaultUserImg} alt='profilePic' className='h-full w-full object-cover'/>
            </div>
            <div className='text-center'>
              <h3 className='font-bold'>{user.firstName+' '+user.lastName}</h3>
              <h5>{user.email}</h5>
              <h5 className='opacity-75'>'{user.userTag}'</h5>
            </div>
          </div>
          <Link to='/edit-profile' className='btn btn-bg w-full btn-plus text-center'>Edit Profile</Link>
        </div>

        <div className='w-fit max-md:w-[90%] max-md:text-center h-fit p-8 px-12 bg-[#333333] rounded-2xl'>
          <span className='text-4xl font-semibold'>Summary: </span>
          <div className='w-full h-[0.5px] bg-slate-600 my-4'></div>
          <div className='flex max-md:flex-col justify-around gap-18'>
            <div>
              <p className='text-xl opacity-75'>Total Income</p>
              <span className=' text-4xl'>₹{totalEarning}</span>
            </div>
            <div>
              <p className='text-xl opacity-75'>Total Expense</p>
              <span className=' text-4xl'>₹{totalExpense}</span>
            </div>
            <div>
              <p className='text-xl opacity-75'>Balance</p>
              <span className={`text-4xl color-plus ${(totalEarning-totalExpense)>0 ? 'color-plus':'color-minus'}`}>₹{totalEarning-totalExpense}</span>
            </div>
          </div>
        </div>
      </section>
      

      <section className="w-fit max-md:w-[90%] color-minus space-y-3 rounded-xl bg-[#333333] p-4 mt-24 mx-auto">
        <h3 className="text-xl font-medium">Delete Account</h3>
        <p className='text-white'> <span className="text-lg color-minus ">Warning:</span> This action is irreversible. Your account and all data will be permanently deleted.</p>
        <button onClick={()=>setShowDeleteBox(true)} className="btn btn-bg px-2 btn-minus">Delete My Account</button>
      </section>
      
      
      <DeleteAccount open={showDeleteBox} onClose={()=>setShowDeleteBox(false)}/>
    </div>
  )
}

export default MyProfile