import React, { useEffect, useRef, useState } from 'react'
import ImageToBase64 from './ImageToBase64';
import { Link } from 'react-router';
import { IoCloseSharp } from 'react-icons/io5';
import { FaPlus } from 'react-icons/fa';
import { IoMdCloseCircleOutline } from 'react-icons/io';

const UpdateExpense = ({open, onClose, initialData, onSave}) => {
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
    const handleImage = async(e) =>{
        const file = e.target.files[0]
        const image = await ImageToBase64(file)

        setEditData((prev)=>{
            return{
                ...prev,
                invoice: image
            }
        })
    }
    const removeImage = (e) =>{
        e.preventDefault()
        setEditData((prev)=>{
            return{
                ...prev,
                invoice: ""
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
<div  className='w-full h-screen fixed inset-0 backdrop-blur-xs z-50 flex justify-center items-center overflow-y-scroll'>
    <section ref={dialogRef} className='bg-[#212121] w-[75%] max-md:w-[80%] m-auto '>
        <div className='flex items-center justify-between p-2 px-4 my-auto '>
            <h2 className='color-minus font-bold'>Update Expense</h2>
            <Link onClick={onClose} className='w-8 h-8 btn btn-bg btn-minus flex justify-center items-center rounded mt-4'>
                <span> <IoCloseSharp/> </span>
            </Link>
        </div>
        <div className='w-full h-[0.5px] bg-slate-600 mt-4'></div>

        <form onSubmit={handleSubmit} className='flex max-md:flex-col gap-2 p-4 justify-around'>
            <section className='w-[55%] max-md:w-[95%] flex flex-col gap-6'>
                <div className='w-full flex items-center justify-between gap-4'>
                    <label htmlFor='title' className='text-xl font-bold'>Title*</label>
                    <input id='title' type='text' name='title' placeholder='Enter title' value={editData.title} required className='input-field w-[80%]' onChange={handleOnChange}/>
                </div>
                <div className='w-full flex items-center justify-between gap-4'>
                    <label htmlFor='type' className='text-xl font-bold'>Type*</label>
                    {/* <input id='type' type='text' name='type' value={data.type} required className='input-field w-[80%]' onChange={handleOnChange}/> */}
                    <select id="type" name="type" placeholder="Category" value={editData.type} required className="input-field w-[80%]" onChange={handleOnChange}>
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
                    <input id='amount' type='number' name='amount' placeholder='Enter amount' value={editData.amount} required className='input-field w-[80%]' onChange={handleOnChange}/>
                </div>
                <div className='flex items-center justify-between gap-4'>
                    <label htmlFor='date' className='text-xl font-bold'>Date*</label>
                    <input id='date' type='date' name='date' value={editData.date} min="1900-01-01" max="2099-12-31" required className='input-field w-[80%]' onChange={handleOnChange}/>
                </div>
                <div className='flex max-sm:flex-col items-center justify-between gap-4 '>
                    <label htmlFor='status' className='text-xl font-bold'>Status*</label>
                    <div className='w-[80%] flex gap-8 '>
                        <div className='flex gap-1 '>
                            <input id='Completed' type='radio' name='status' value='Completed' checked={editData.status==='Completed'} className='input-field ' onChange={handleOnChange}/>
                            <label htmlFor='Completed'>Completed</label>
                        </div>
                        <div className='flex gap-1 '>
                            <input id='Pending' type='radio' name='status' value='Pending' checked={editData.status==='Pending'} className='input-field ' onChange={handleOnChange}/>
                            <label htmlFor='Pending'>Pending</label>
                        </div>    
                    </div>    
                </div>
                <div className='flex max-sm:flex-col justify-between gap-4 '>
                    <label htmlFor='description' className='text-xl font-bold'>Description</label>
                    <textarea id="description" name="description" value={editData.description} placeholder="Enter other details (optional)" className="input-field w-[80%] h-14efc resize-none" onChange={handleOnChange}/>  
                </div>
            </section>
            <section className='h-98 w-78 max-md:w-[95%] max-md:h-24 flex flex-col justify-between gap-2 '>
                {
                    editData.invoice ? (
                        <div className='w-full relative border-[1px] rounded object-cover '>
                            <img src={editData.invoice} alt='invoice' loading="lazy" className='h-78 w-78 max-md:h-24 object-cover overflow-hidden max-md:'/>
                            <i className='btn-minus text-2xl absolute -top-2 -right-4 cursor-pointer' onClick={removeImage}><IoMdCloseCircleOutline/></i>
                        </div>
                    ) : (
                        <label htmlFor='invoice' className='h-88 input-field flex flex-col justify-center items-center cursor-pointer'>
                            <i className='text-4xl'><FaPlus/></i>
                            <p>Upload an Invoice</p>
                            <p className='opacity-50'>(optional)</p>
                            <input id='invoice' type='file' name='invoice' accept="image/*" className='hidden' onChange={handleImage}/>
                        </label>
                    )
                }
                <button className='btn btn-bg btn-plus'>Save</button>
            </section>
        </form>

    </section>
</div>
  )
}

export default UpdateExpense