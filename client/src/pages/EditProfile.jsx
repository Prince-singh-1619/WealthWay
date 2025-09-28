import React, { useState } from 'react'
import defaultUserPic from '../assets/user.png'
import ImageToBase64 from '../helpers/ImageToBase64'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import SummaryApi from '../helpers/SummaryApi'
import { updateUser } from '../store/authSlice'
import { Link, useNavigate } from 'react-router'
import { IoCloseSharp } from 'react-icons/io5'

const EditProfile = () => {
  const [loading, setLoading] = useState(false)
  const {user} = useSelector((state) => state.auth)
  // console.log("user-data", user)
  const navigate = useNavigate()

  const [data, setData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    profilePic: user?.profilePic || "",
    email: user?.email || "",
    userTag: user?.userTag || ""
  })
  const dispatch = useDispatch()

  // useEffect(() => {
  //   if (user) {
  //     setData({
  //       firstName: user.firstName || "",
  //       lastName: user.lastName || "",
  //       profilePic: user.profilePic || "",
  //       email: user.email || "",
  //       userTag: user.userTag || "",
  //     });
  //   }
  // }, [user]);

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
    setData((prev) => {
        return {
          ...prev,
          [name]: value
        }
    })
  }
  console.log("input data", data)

  const handleSubmit = async(e) =>{
    e.preventDefault();
    setLoading(true)
    const updatedFields = {}
    for(let key in data){
      if(data[key] !== user[key]){
        updatedFields[key] = data[key]
      }
    }

    if(Object.keys(updatedFields).length===0){
      toast.warning("No changes made")
      setLoading(false)
      return;
    }
    const userId = user.userId

    try {
      const token = localStorage.getItem("authToken")
      console.log(SummaryApi.updateProfile.url)

      const response = await fetch(SummaryApi.updateProfile.url, {
        method: SummaryApi.updateProfile.method,
        // credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          "Authorization" : `Bearer ${token}`,
        },
        body: JSON.stringify({...updatedFields, userId}),
      })  

      const dataApi = await response.json()
      if(dataApi.success){
        dispatch( updateUser(dataApi.data) )
        navigate('/my-profile')
        toast.success(dataApi.message)
      }
      if(dataApi.error){
        // toast.error("inside editProfile", dataApi.message, dataApi.error)
        toast.error(dataApi.message)
      }
    } 
    catch (error) {
      console.log("error occured in EditProfile", error)
      toast.warning("Error updating profile")
    }
    setLoading(false)
  }

  return (
    <section className='min-h-screen h-full p-4 pb-0'>
      <div className='flex  justify-between'>
        <p className='text-5xl max-sm:text-3xl font-bold text-center'>Update Profile</p>
        <button onClick={()=>navigate(-1)} className='w-8 h-8 btn btn-bg btn-minus flex justify-center items-center rounded mt-2'>
          <span> <IoCloseSharp/> </span>
        </button>
      </div>
      <div className='w-full h-[0.5px] bg-slate-600 mt-4'></div>

      <section className='mt-32 max-md:mt-12 max-md:w-full flex flex-col justify-center items-center '>
        <form onSubmit={handleSubmit} className='flex flex-col items-around gap-4 '>  
          <div className='w-fit flex max-md:flex-col justify-around gap-4'>
              {/* input profile image */}
              <div className='h-56 w-56 rounded-full mx-auto flex justify-center items-center border-[1px] border-slate-400 dark:border-[#413c3c] overflow-hidden relative'>
                  <img src={data?.profilePic || defaultUserPic} alt='user profile' className='h-full w-full rounded-full object-cover'/>
                  <input id='upload-pic' type='file' name='profilePic' accept="image/*" className='hidden' onChange={handleUploadPic}/>
                  <label htmlFor='upload-pic' className='absolute w-full bg-opacity-80 text-center bottom-0 cursor-pointer'>
                      <span className='w-full bg-slate-300 dark:bg-[#322f2f] text-black dark:text-[#dadada] bg-opacity-100 z-10 p-1 pt-0 rounded-lg scale-10 border-[1px]'>
                          { data.profilePic==="" ? ("Upload") : (
                              <span onClick={removeProfilePic} className='text-red-600 dark:text-red-400'>remove</span>
                              )
                          }
                      </span>
                      
                  </label>
              </div>

              {/* input profile data */}
              <div className='flex flex-col gap-4 justify-center'>
                <div className=' flex gap-4'>
                    <input type='text' placeholder={data.firstName} name='firstName'  className='w-full input-field' value={data.firstName} onChange={handleOnChange}/>
                    <input type='text' placeholder='Last name' name='lastName'  className='w-full input-field' value={data.lastName} onChange={handleOnChange} />
                </div>
                <span className=' input-field cursor-not-allowed'>{data?.email}</span>
                <input type='text' placeholder={data.userTag!=='' ? data.userTag : "user tag"} name='userTag'  className='w-full input-field' value={data.userTag} onChange={handleOnChange}/>
              </div>
                  
          </div>
          <button className='btn btn-bg btn-plus'>{ loading?('Updating...'):('Update') }</button>
        </form>

      </section>
    </section>
  )
}

export default EditProfile