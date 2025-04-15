import React, { useEffect, useRef, useState } from 'react'
// import SummaryApi from './SummaryApi'
import { IoCloseSharp } from 'react-icons/io5'
import { Link } from 'react-router'

const UpdateEarning = ({open, onClose, initialData, onSave}) => {

    const [editData, setEditData] = useState(initialData || {})

    useEffect(() => {
        if (initialData) {
          setEditData({
            ...initialData,
            date: initialData.date ? initialData.date.split('T')[0] : '',
            status: initialData.status || '', 
          });
        }
      }, [initialData]);

    const handleOnChange = (e) =>{
        const {name, value} = e.target
        setEditData((prev)=>{
            return {
                ...prev,
                [name] : value
            }
        })
    }
    const handleSubmit = async(e) =>{
        e.preventDefault()
        onSave(editData);
        onClose()
    }

    const dialogRef = useRef(null)
    useEffect(()=>{
        const handleClickOutside = (e) =>{
            if(dialogRef.current && !dialogRef.current.contains(e.target)){
                onClose()
            }
        }

        if(open){
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () =>{
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [open, onClose])

    if(!open) return null

  return (
    <div  className='w-full h-screen fixed inset-0 backdrop-blur-xs z-50  overflow-y-scroll'>
    <section ref={dialogRef} className='w-[45%] max-md:w-[80%] h-fit py-4 m-auto bg-[#212121] border-[1px] border-opacity-25 rounded-xl '>
        <div  className=' flex items-center justify-between p-2 px-4 my-auto '>
            <h2 className='color-plus font-bold'>Update Earning</h2>
            <Link to='/earnings' onClick={onClose} className='w-8 h-8 btn btn-bg btn-minus flex justify-center items-center rounded mt-4'>
                <span> <IoCloseSharp/> </span>
            </Link>
        </div>
        <div className='w-full h-[0.5px] bg-slate-600 mt-4'></div>

        <form onSubmit={handleSubmit} className='flex p-4 justify-start'>
            <section className='w-[95%] max-[1024px]:w-[95%] flex flex-col gap-6'>
                <div className='w-full flex max-[400px]:flex-col items-center justify-between gap-4'>
                    <label htmlFor='title' className='text-xl font-bold'>Title*</label>
                    <input id='title' type='text' name='title' placeholder='Enter title' value={editData.title} required className='input-field w-[80%]' onChange={handleOnChange}/>
                </div>
                <div className='w-full flex max-[400px]:flex-col items-center justify-between gap-4'>
                    <label htmlFor='type' className='text-xl font-bold'>Type*</label>
                    {/* <input id='type' type='text' name='type' value={data.type} required className='input-field w-[80%]' onChange={handleOnChange}/> */}
                    <select id="type" name="type" placeholder="Category" value={editData.type} required className="input-field w-[80%]" onChange={handleOnChange}>
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
                    <input id='amount' type='number' name='amount' placeholder='Enter amount' value={editData.amount} required className='input-field w-[80%]' onChange={handleOnChange}/>
                </div>
                <div className='flex max-[400px]:flex-col items-center justify-between gap-4'>
                    <label htmlFor='date' className='text-xl font-bold'>Date*</label>
                    <input id='date' type='date' name='date' value={editData.date} min="1900-01-01" max="2099-12-31" required className='input-field w-[80%]' onChange={handleOnChange}/>
                </div>
                <div className='flex max-[400px]:flex-col items-center justify-between gap-4 '>
                    <label htmlFor='status' className='text-xl font-bold'>Status*</label>
                    <div className='w-[80%] flex gap-8'>
                        <div className='flex gap-1 '>
                            <input id='Received' type='radio' name='status' value='Received' checked={editData.status==='Received'} className='input-field ' onChange={handleOnChange}/>
                            <label htmlFor='Received'>Received</label>
                        </div>
                        <div className='flex gap-1 '>
                            <input id='Pending' type='radio' name='status' value='Pending' checked={editData.status==='Pending'} className='input-field ' onChange={handleOnChange}/>
                            <label htmlFor='Pending'>Pending</label>
                        </div>    
                    </div>    
                </div>
                <div className='flex max-[400px]:flex-col max-[400px]:items-center justify-between gap-4 '>
                    <label htmlFor='description' className='text-xl font-bold'>Description</label>
                    <textarea id="description" name="description" value={editData.description} placeholder="Enter other details (optional)" className="input-field w-[80%] h-12 resize-none" onChange={handleOnChange}/>  
                </div>
                <button className='btn btn-bg btn-plus w-[80%] ml-auto max-[400px]:mx-auto'>Update</button>
            </section>
        </form>

    </section>
    </div>
    
  )
}

export default UpdateEarning