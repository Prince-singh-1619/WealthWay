import React, { useState } from 'react'
import { MdEmail, MdLocationPin, MdPhone } from "react-icons/md";
import { useSelector } from 'react-redux';
import SummaryApi from '../helpers/SummaryApi';
import { toast } from 'react-toastify';

const Support = () => {
  const {user} = useSelector(state => state.auth)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    userId: user.userId,
    name: "",
    email: user.email,
    message: "",
  })

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData((prev) => {
        return {
          ...prev,
          [name]: value
        }
    })
  }
  // console.log("input data", data)

  const handleSubmit = async(e) =>{
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch(SummaryApi.getSupport.url, {
        method: SummaryApi.getSupport.method,
        // credentials: 'include',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`, //added after cookie removal
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })  

      const dataApi = await response.json()
      if(dataApi.success){
        toast.success(dataApi.message)
        setData({
          name: "",
          message: "",
        })
      }
      if(dataApi.error){
        console.log("inside try support", dataApi.message)
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
    <section className="min-h-screen text-white py-12 p-4 md:px-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Need Help?</h2>
        <p className="text-center opacity-50 mb-10">Our support team is here to assist you. Reach out anytime!</p>

        <div className="grid md:grid-cols-2 gap-10">

          {/* Contact Form */}
          <div className="bg-[#333333] p-6 rounded-2xl">
            <h3 className="text-xl font-semibold mb-4">Send us a message</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input type="text" name="name" value={user.name} placeholder="Full Name" onChange={handleOnChange} className="input-field"/>
              <span type="email" name="email" value={user.email} placeholder="Email Address" className="input-field cursor-no-drop">{user.email}</span>
              <textarea name="message" value={user.message} placeholder="Your Message" rows="5" onChange={handleOnChange} className="input-field"/>
              <button className="btn btn-bg btn-plus py-2 font-semibold">{loading ? "Sending..." : "Send Message"}</button>
            </form>
          </div>

          {/* Contact Info / Help Options */}
          <div className="bg-[#333333] p-6 rounded-2xl flex flex-col justify-between">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">Quick Help</h3>
              <ul className="space-y-3 ">
                <li className='flex gap-2 items-center'>
                  <i className='opacity-75'><MdEmail/></i> 
                  <p className='opacity-75'>Email: </p>
                  <span className="opacity-100">support@wealthway.com</span>
                </li>
                <li className='flex gap-2 items-center'>
                  <i className='opacity-75'><MdPhone/></i> 
                  <p className='opacity-75'>Phone: </p>
                  <span className="opacity-100">+91 98765 43210</span>
                </li>
                <li className='flex gap-2 items-center'>
                  <i className='opacity-75'><MdLocationPin/></i> 
                  <p className='opacity-75'>Address: </p>
                  <span className="opacity-100">Varanasi, UP, India</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">FAQs</h4>
              <p className="text-sm text-gray-400">Visit our <a href="#" className="color-plus underline hover:no-underline">FAQ section</a> to find answers to common questions.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}

export default Support