import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import ImageToBase64 from '../helpers/ImageToBase64'
import SummaryApi from '../helpers/SummaryApi'
import { toast } from 'react-toastify'
import img1 from '../assets/cropped-welcome.jpg'
import img2 from '../assets/jumbled.png'
import img3 from '../assets/front 2.jpg'
import img4 from '../assets/plant money.png'
import defaultUser from '../assets/user.png'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import Carousel from '../components/Carousel'
import { login } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import logo from '../assets/logo-withoutBg.png'

const SignUp = () => {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        profilePic: "",
        firstName: "",
        lastName: "",
        email: "",
        userTag: "",
        password: "",
        confirmPassword: ""
    })
    const dispatch = useDispatch()
    const images = [img1, img2, img3, img4]

    const handleUploadPic = async (e) => {
        const file = e.target.files[0]
        const imagePic = await ImageToBase64(file)

        setData((prev) => {
            return {
                ...prev,
                profilePic: imagePic
            }
        })
    }
    const removeProfilePic = (e)=>{
        e.preventDefault()
        setData((prev) =>{
            return{
                ...prev, 
                profilePic: ""
            }
        })
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target
        if(name==="password"){
            setError(value.length < 8 ? "Minimum 8 characters required" : "");
        }
        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        console.log("The input data is: ", data)
        // console.log("the url is: ", SummaryApi.signUp.url, SummaryApi.signUp.method)

        if(data.password.length<8){
            toast.warning("Password length is less than 8")
        }
        else if (data.password === data.confirmPassword) {
            const dataResponse = await fetch(SummaryApi.signUp.url, {
                method: SummaryApi.signUp.method,
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            })
            const dataApi = await dataResponse.json()
            console.log("dataApi at Signup: ", dataApi)

            if (dataApi.success) {
                console.log("dataApi message from success: ", dataApi.message)
                dispatch(login({
                    user: dataApi.user,
                    // token: dataApi.data
                    token: dataApi.token
                }))
                
                //for directly going to homepage
                // localStorage.setItem("authToken", dataApi.data) //here data===token as passed from backend
                localStorage.setItem("authToken", dataApi.token) 
                toast.success(dataApi.message)
                navigate('/')
            }
            if (dataApi.error) {
                console.log("dataApi message from error: ", dataApi.message)
                toast.error(dataApi.message)
            }
            setLoading(false)
        }
        else {
            toast.warning("Please check password and confirm password")
        }
    }

    return (
        <div className='min-h-screen h-full flex flex-col justify-center items-center'>
            {/* <p class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 text-sm rounded-md shadow-md mb-2">
                <strong class="font-semibold">Important:</strong> Please enable 
                <strong class="font-semibold"> third-party cookies</strong> in your browser to log in or sign up successfully.
            </p> */}

            <div className='flex justify-center items-center gap-2'>
                <img src={logo} alt='logo' className='w-16 h-16'/>
                <p className='text-4xl  '>WealthWay</p>
            </div>
            <section id='Signup' className='h-full w-full py-6 flex max-md:justify-center max-md:items-center gap-6 px-6'>
                <div className='w-1/2 h-full flex my-auto justify-center items-center max-md:hidden'>
                    <Carousel images={images} />
                </div>

                <section className='w-1/2 max-md:w-full flex justify-center '>
                    <div className='w-[90%] flex flex-col justify-around gap-4'>
                        <p className='text-5xl max-sm:text-3xl font-bold text-center'>Create an account</p>
                        
                        {/* input profile image */}
                        <div className='h-28 w-28 rounded-full mx-auto flex justify-center items-center  border-[1px] border-slate-400 dark:border-[#413c3c] overflow-hidden relative'>
                            <img src={data.profilePic || defaultUser} alt='user profile' className='h-full w-full rounded-full object-cover'/>
                            <input id='upload-pic' type='file' name='profilePic' accept="image/*" className='hidden' onChange={handleUploadPic}/>
                            <label htmlFor='upload-pic' className='absolute w-full bg-opacity-80 text-center bottom-0 cursor-pointer'>
                                <span className='w-full bg-slate-300 dark:bg-[#322f2f] text-black dark:text-[#dadada] bg-opacity-100 z-10 p-1 pt-0 rounded border-[1px]'>
                                    { data.profilePic==="" ? ("Upload") : (
                                        <span onClick={removeProfilePic} className='text-red-600 dark:text-red-400'>remove</span>
                                        )
                                    }
                                </span>
                                
                            </label>
                        </div>

                        {/* input profile data */}
                        <form onSubmit={handleSubmit} className='flex flex-col items-around gap-4'>
                            <div className=' flex gap-4'>
                                <input placeholder='First name' name='firstName' required className='w-full input-field' value={data.firstName} onChange={handleOnChange}/>
                                <input placeholder='Last name' name='lastName' required className='w-full input-field' value={data.lastName} onChange={handleOnChange} />
                            </div>
                            <input placeholder='Email' type='email' name='email' required className='input-field' value={data.email} onChange={handleOnChange} />
                            <label htmlFor="password" className=' flex justify-between items-center relative'>
                                <input id='password' placeholder='password' name='password' required value={data.password} onChange={handleOnChange} type={showPassword ? "text" : "password"} className='w-full input-field outline-none border-0 ' />
                                <i onClick={() => setShowPassword((prev) => !prev)} className='cursor-pointer absolute right-4'> {showPassword ? (<FaEyeSlash />) : (<FaEye />)}
                                </i>
                            </label>
                                {error && <p className='text-red-400 -mt-4 text-sm ml-2'>{error}</p>}
                            <input placeholder='confirm password' type='password' name='confirmPassword' required value={data.confirmPassword} onChange={handleOnChange} className='input-field' />
                            <button className='btn btn-bg btn-plus'>{ loading?('loading...'):('Create account') }</button>
                        </form>

                        <span>Already have an account? <Link to='/login' className='hover:underline'><span className='nav-link text-[#646cff]'>Log in</span></Link></span>
                    </div>

                </section>

            </section>
        </div>
        
    )
}

export default SignUp