import React, { useEffect, useRef, useState } from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import SummaryApi from '../helpers/SummaryApi'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/authSlice'
import { useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const DeleteAccount = ({open, onClose}) => {
    const [data, setData] = useState({password: ""})
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const {user} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const handleChange = (e) =>{
        const {name, value} = e.target
        setData((prev)=>{
            return{
                ...prev,
                [name] : value
            }
        })
        console.log("data", data)
    }
    const handleSubmit = async(e) =>{
        e.preventDefault()
        setLoading(true)
        try {
            const response = await fetch(`${SummaryApi.deleteUser.url}?password=${data.password}&userId=${user.userId}`, {
                method: SummaryApi.deleteUser.method,
                credentials: 'include',
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`, //added after cookie removal
                    'Content-Type' : 'application/json'
                },
            })
            const responseData = await response.json()
              
            if(responseData.success){
                toast.success(responseData.message)
                dispatch(logout())
                localStorage.clear()
                navigate('/login')
            }
            if(responseData.error){
                toast.error(responseData.message)
            }
        } catch (error) {
            toast.warning("Error occurred in Deleting", error)
        }
        setLoading(false)
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
    <section className='fixed inset-0 backdrop-blur-lg w-full h-full flex justify-center items-center z-50'>
        <form ref={dialogRef} onSubmit={handleSubmit} className='w-fit bg-[#222222] p-8 rounded-2xl space-y-4'>
            <div className='flex justify-between items-center'>
                <span className='color-minus text-4xl font-bold'>Delete my Account</span>
                <button onClick={onClose} className='w-16 h-12 btn btn-bg btn-plus flex justify-center items-center rounded mt-2'>
                    <span> <IoCloseSharp/> </span>
                </button>
            </div>
            <div className='flex gap-4'>
                <span className='color-minus'>Warning:</span>
                <p>Are you sure, you want to delete your account. <br/> Deleting account will also delete all its related data.</p>
            </div>
            <div className='flex flex-col gap-4'>
                <p>To delete, type your account "password".</p>
                {/* <input type='text' name='password' value={data.password} required onChange={handleChange} className='input-field'/> */}
                <label htmlFor="password" className=' flex justify-between items-center relative'>
                    <input id='password' placeholder='password' name='password' required value={data.password} onChange={handleChange} type={showPassword ? "text" : "password"} className='w-full input-field outline-none border-0 ' />
                    <i onClick={() => setShowPassword((prev) => !prev)} className='cursor-pointer absolute right-4'> {showPassword ? (<FaEyeSlash />) : (<FaEye />)}
                    </i>
                </label>
            </div>
            <div className='flex flex-row-reverse'>
                <button className='btn btn-bg color-minus btn-minus'>{loading ? 'Deleting...' : "Delete Account"}</button>
            </div>
        </form>
    </section>
    
  )
}

export default DeleteAccount