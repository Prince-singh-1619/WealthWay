import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import SummaryApi from '../helpers/SummaryApi'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import Carousel from '../components/Carousel'
import img1 from '../assets/workspace.png'
import img2 from '../assets/bills.jpg'
import img3 from '../assets/image person.png'
import img4 from '../assets/money.jpg'
import { toast } from 'react-toastify'
import { UserContext } from '../context/UserContext'
import { useDispatch } from 'react-redux'
import { login } from '../store/authSlice'
import logo from '../assets/logo-withoutBg.png'

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const [loading, setLoading] = useState(false)
    // const {setUserId} = useContext(UserContext)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const images = [img1, img2, img3, img4]

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
        setLoading(true)
        console.log("The input data is: ", data)

        const dataResponse = await fetch(SummaryApi.login.url, {
            method: SummaryApi.login.method,
            credentials: "include",
            headers: {
                "content-type" : "application/json",
            },
            body: JSON.stringify(data)
        })

        const dataApi = await dataResponse.json()
        console.log("dataApilogin", dataApi)

        if(dataApi.success){
            console.log("fetched data", dataApi)
            dispatch(login({
                user: dataApi.user,
                token: dataApi.data
            }))


            localStorage.setItem("authToken", dataApi.data) //here data===token as passed from backend
            // localStorage.setItem("token", dataApi.data.token) 
            console.log("authToken", dataApi.data)

        // need to used here redux or recoil to store the data
            // localStorage.setItem("userId", dataApi.user.userId)
            // console.log("userId", dataApi.user.userId)
            toast.success(dataApi.message)
            // setUserId(dataApi.user.userId)

            // navigate('/', {userId: dataApi.user.userId})
            navigate('/')
            console.log("navigating...")
        }
        if(dataApi.error){
            toast.error(dataApi.message)
        }
        setLoading(false)

    }


    return (
        <div className='h-screen flex flex-col justify-center items-center'>
            <div className='flex justify-center items-center gap-2'>
                <img src={logo} alt='logo' className='w-16 h-16'/>
                <p className='text-4xl  '>WealthWay</p>
            </div>

            <section className='w-full h-fit flex justify-center items-center py-4 mt-4 '>

                <section className='w-1/2 max-md:w-full flex justify-center'>
                    <div className='w-[90%] flex flex-col gap-4'>
                        <p className='text-5xl max-sm:text-3xl font-bold text-center'>Login</p>
                        <span className='w-full text-xl max-sm:text-sm text-slate-700 dark:text-slate-300 -mt-2 mb-6 text-center tracking-[0.5rem]'>to get started</span>

                        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                            <input placeholder='Email' type='email' name='email' required className='input-field' value={data.email} onChange={handleOnChange} />
                            <label htmlFor="password" className=' flex justify-between items-center relative'>
                                <input id='password' placeholder='password' name='password' required value={data.password} onChange={handleOnChange} type={showPassword ? "text" : "password"} className='w-full input-field outline-none border-0 ' />
                                <i onClick={() => setShowPassword((prev) => !prev)} className='cursor-pointer absolute right-4'> {showPassword ? (<FaEyeSlash />) : (<FaEye />)}
                                </i>
                            </label>
                            <button className='btn btn-bg btn-plus'>{loading?("loading..."):("Log in")}</button>
                        </form>

                        <span>Don't have an account? <Link to='/signup' className='hover:underline'><span className='nav-link text-[#646cff]'>Sign Up</span></Link></span>
                    </div>

                </section>

                <div className='w-1/2 h-full flex my-auto justify-center items-center max-md:hidden'>
                    <Carousel images={images} />
                </div>
            </section>
        </div>
        
      )
}

export default Login