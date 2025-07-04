import React, { useState } from 'react'
import ImageToBase64 from '../helpers/ImageToBase64'
import SummaryApi from '../helpers/SummaryApi'
import { FaPlus } from 'react-icons/fa'
import { IoCloseSharp } from 'react-icons/io5'
import { IoMdCloseCircleOutline } from "react-icons/io";
import {Link, useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

const NewEarning = () => {
    const [data, setData] = useState({
        title: "",
        type: "",
        amount: "",
        date: "",
        status: "",
        description: "",
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
    const handleSubmit = async(e) =>{
        e.preventDefault()
        console.log("data submitted", data)
        const userId = user.userId
        // const userId = user.userId
        // const userId = localStorage.getItem("userId")

        const response = await fetch(SummaryApi.newEarning.url, {
            method: SummaryApi.newEarning.method,
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`, //added after cookie removal
                "content-type" : "application/json"
            },
            body: JSON.stringify({...data, userId})
        })

        const responseData = await response.json()
        if(responseData.success){
            navigate('/earnings')
            toast.success(responseData.message)
        }
        if(responseData.error){
            toast.warning(responseData.message)
        }
    }


return (
  <section>
      <div className='flex items-center justify-between p-2 px-4 my-auto '>
          <h2 className='color-plus font-bold'>New Earning</h2>
          <button onClick={()=>navigate(-1)} className='w-8 h-8 btn btn-bg btn-minus flex justify-center items-center rounded mt-4'>
              <span> <IoCloseSharp/> </span>
          </button>
      </div>
      <div className='w-full h-[0.5px] bg-slate-600 mt-4'></div>

      <form onSubmit={handleSubmit} className='flex p-4 justify-start pb-12'>
          <section className='w-[55%] max-[1024px]:w-[95%] flex flex-col gap-6'>
              <div className='w-full flex max-[400px]:flex-col items-center justify-between gap-4'>
                  <label htmlFor='title' className='text-xl font-bold'>Title*</label>
                  <input id='title' type='text' name='title' placeholder='Enter title' value={data.title} required className='input-field w-[80%]' onChange={handleOnChange}/>
              </div>
              <div className='w-full flex max-[400px]:flex-col items-center justify-between gap-4'>
                  <label htmlFor='type' className='text-xl font-bold'>Type*</label>
                  {/* <input id='type' type='text' name='type' value={data.type} required className='input-field w-[80%]' onChange={handleOnChange}/> */}
                  <select id="type" name="type" placeholder="Category" value={data.type} required className="input-field w-[80%]" onChange={handleOnChange}>
                      <option value="">Select Type</option>
                      <option value="Salary">Salary</option>
                      <option value="Freelance">Freelance</option>
                      <option value="Business">Business</option>
                      <option value="Investment">Investment</option>
                      <option value="Interest">Interest</option>
                      <option value="Gift">Gift</option>
                      <option value="Refund">Refund</option>
                      <option value="Rent">Rent</option>
                      <option value="Selling">Selling</option>
                      <option value="Bonus">Bonus</option>
                      <option value="Others">Others</option>
                  </select>
              </div>
              <div className='w-full flex max-[400px]:flex-col items-center justify-between gap-4'>
                  <label htmlFor='amount' className='text-xl font-bold'>Amount*</label>
                  <input id='amount' type='number' name='amount' placeholder='Enter amount' value={data.amount} required className='input-field w-[80%]' onChange={handleOnChange}/>
              </div>
              <div className='flex max-[400px]:flex-col items-center justify-between gap-4'>
                  <label htmlFor='date' className='text-xl font-bold'>Date*</label>
                  <input id='date' type='date' name='date' value={data.date} min="1900-01-01" max="2099-12-31" required className='input-field w-[80%]' onChange={handleOnChange}/>
              </div>
              <div className='flex max-[400px]:flex-col items-center justify-between gap-4 '>
                  <label htmlFor='status' className='text-xl font-bold'>Status*</label>
                  <div className='w-[80%] flex gap-8'>
                      <div className='flex gap-1 '>
                          <input id='Received' type='radio' name='status' value='Received' className='input-field ' onChange={handleOnChange}/>
                          <label htmlFor='Received'>Received</label>
                      </div>
                      <div className='flex gap-1 '>
                          <input id='Pending' type='radio' name='status' value='Pending' className='input-field ' onChange={handleOnChange}/>
                          <label htmlFor='Pending'>Pending</label>
                      </div>    
                  </div>    
              </div>
              <div className='flex max-[400px]:flex-col max-[400px]:items-center justify-between gap-4 '>
                  <label htmlFor='description' className='text-xl font-bold'>Description</label>
                  <textarea id="description" name="description" value={data.description} placeholder="Enter other details (optional)" className="input-field w-[80%] h-48 resize-none" onChange={handleOnChange}/>  
              </div>
              <button className='btn btn-bg btn-plus w-[80%] ml-auto max-[400px]:mx-auto mt-4'>Save</button>
          </section>
      </form>

  </section>
)
}

export default NewEarning