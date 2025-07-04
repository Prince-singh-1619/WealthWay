import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { IoCloseSharp } from 'react-icons/io5'
import ImageToBase64 from '../helpers/ImageToBase64'
import { IoMdCloseCircleOutline } from "react-icons/io";
import {Link, useNavigate} from 'react-router-dom'
import SummaryApi from '../helpers/SummaryApi';
import { toast } from 'react-toastify';
import { UserContext } from '../context/UserContext';
import { useSelector } from 'react-redux';


const NewExpense = () => {
    const [data, setData] = useState({
        title: "",
        type: "",
        amount: "",
        date: "",
        status: "",
        description: "",
        invoice: "",
    })
    const navigate = useNavigate()
    const {user} = useSelector(state => state.auth)

    const handleOnChange = (e) =>{
        const {name, value} = e.target
        setData((prev)=>{
            return {
                ...prev,
                [name] : value
            }
        })
    }
    const handleImage = async(e) =>{
        const file = e.target.files[0]
        const image = await ImageToBase64(file)

        setData((prev)=>{
            return{
                ...prev,
                invoice: image
            }
        })
    }
    const removeImage = (e) =>{
        e.preventDefault()
        setData((prev)=>{
            return{
                ...prev,
                invoice: ""
            }
        })
    }
    
    const handleSubmit = async(e) =>{
        e.preventDefault()
        console.log("data submitted", data)
        const userId = user.userId
        // const userId = localStorage.getItem("userId")
        // const token = localStorage.getItem("authToken")

        const response = await fetch(SummaryApi.newExpense.url, {
            method: SummaryApi.newExpense.method,
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`, //added after cookie removal
                "content-type" : "application/json",
            },
            body: JSON.stringify({...data, userId})
        })

        const responseData = await response.json()
        if(responseData.success){
            toast.success(responseData.message)
            navigate('/expense')
        }
        if(responseData.error){
            toast.warning(responseData.message)
        }
    }


  return (
    <section className=''>
        <div className='flex items-center justify-between p-2 px-4 my-auto '>
            <h2 className='color-minus font-bold'>New Expense</h2>
            <button onClick={()=>navigate(-1)} className='w-8 h-8 btn btn-bg btn-minus flex justify-center items-center rounded mt-4'>
                <span> <IoCloseSharp/> </span>
            </button>
        </div>
        <div className='w-full h-[0.5px] bg-slate-600 mt-4'></div>

        <form onSubmit={handleSubmit} className='flex max-md:flex-col gap-2 p-4 justify-around max-md:pb-36'>
            <section className='w-[55%] max-md:w-[95%] flex flex-col gap-6'>
                <div className='w-full flex items-center justify-between gap-4'>
                    <label htmlFor='title' className='text-xl font-bold'>Title*</label>
                    <input id='title' type='text' name='title' placeholder='Enter title' value={data.title} required className='input-field w-[80%]' onChange={handleOnChange}/>
                </div>
                <div className='w-full flex items-center justify-between gap-4'>
                    <label htmlFor='type' className='text-xl font-bold'>Type*</label>
                    {/* <input id='type' type='text' name='type' value={data.type} required className='input-field w-[80%]' onChange={handleOnChange}/> */}
                    <select id="type" name="type" placeholder="Category" value={data.type} required className="input-field w-[80%]" onChange={handleOnChange}>
                        <option value="">Select Type</option>
                        <option value="Food & Essentials">Food & Essentials</option>
                        <option value="Transport">Transport</option>
                        <option value="Education">Education</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Rent">Rent</option>
                        <option value="Housing">Housing</option>
                        <option value="Subscriptions">Subscriptions</option>
                        <option value="Others">Others</option>
                    </select>
                </div>
                <div className='w-full flex items-center justify-between gap-4'>
                    <label htmlFor='amount' className='text-xl font-bold'>Amount*</label>
                    <input id='amount' type='number' name='amount' placeholder='Enter amount' value={data.amount} required className='input-field w-[80%]' onChange={handleOnChange}/>
                </div>
                <div className='flex items-center justify-between gap-4'>
                    <label htmlFor='date' className='text-xl font-bold'>Date*</label>
                    <input id='date' type='date' name='date' value={data.date} min="1900-01-01" max="2099-12-31" required className='input-field w-[80%]' onChange={handleOnChange}/>
                </div>
                <div className='flex max-sm:flex-col items-center justify-between gap-4 '>
                    <label htmlFor='status' className='text-xl font-bold'>Status*</label>
                    <div className='w-[80%] flex gap-8 '>
                        <div className='flex gap-1 '>
                            <input id='Completed' type='radio' name='status' value='Completed' className='input-field ' onChange={handleOnChange}/>
                            <label htmlFor='Completed'>Completed</label>
                        </div>
                        <div className='flex gap-1 '>
                            <input id='Pending' type='radio' name='status' value='Pending' className='input-field ' onChange={handleOnChange}/>
                            <label htmlFor='Pending'>Pending</label>
                        </div>    
                    </div>    
                </div>
                <div className='flex max-sm:flex-col justify-between gap-4 '>
                    <label htmlFor='description' className='text-xl font-bold'>Description</label>
                    <textarea id="description" name="description" value={data.description} placeholder="Enter other details (optional)" className="input-field w-[80%] h-48 resize-none" onChange={handleOnChange}/>  
                </div>
            </section>
            <section className='h-full w-108 max-md:w-[95%] max-md:h-24 flex flex-col justify-between gap-8'>
                {
                    data.invoice ? (
                        <div className='relative border-[1px] rounded'>
                            <img src={data.invoice} alt='invoice' loading="lazy" className='max-md:h-24 max-md:'/>
                            <i className='btn-minus text-2xl absolute -top-2 -right-4 cursor-pointer' onClick={removeImage}><IoMdCloseCircleOutline/></i>
                        </div>
                    ) : (
                        <label htmlFor='invoice' className='h-118 input-field flex flex-col justify-center items-center cursor-pointer'>
                            <i className='text-4xl'><FaPlus/></i>
                            <p>Upload an Invoice</p>
                            <p className='opacity-50'>(optional)</p>
                            <input id='invoice' type='file' name='invoice' accept="image/*" className='hidden' onChange={handleImage}/>
                        </label>
                    )
                }
                <button className='btn btn-bg btn-plus max-md:my-4'>Save</button>
            </section>
        </form>

    </section>
  )
}

export default NewExpense