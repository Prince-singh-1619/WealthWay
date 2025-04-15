import React, { useState } from 'react'
import profileImg from '../assets/welcome-1.jpg' 
import { FaHome, FaMoneyCheck } from "react-icons/fa";
import { MdWallet } from "react-icons/md";
import { IoAirplane } from "react-icons/io5";
import { PiFadersBold } from "react-icons/pi";
import { IoMdCall } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { LuPanelRightOpen, LuPanelRightClose, LuUser  } from "react-icons/lu";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from 'react-redux';
import { setShowSidebar, toggleSidebar } from '../store/navSlice';
import logo from '../assets/logo-withoutBg.png'
import { BiSupport } from "react-icons/bi";


const Navbar = () => {
    // const [showSidebar, setShowSidebar] = useState(true);
    const [linkClicked, setLinkClicked] = useState(0)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const showSidebar = useSelector(state => state.navData.showSidebar)
    const {user} = useSelector((state) => state.auth)


    const navArray = [
        {
            icon: <FaHome/>,
            title: "Home",
            link: "/",
        },
        {
            icon: <MdWallet/>,
            title: "Expenses",
            link: "/expense",
        },
        // {
        //     icon: <IoAirplane/>,
        //     title: "Trips",
        //     link: "/trips",
        // },
        {
            icon: <FaMoneyCheck/>,
            title: "Earnings",
            link: "/earnings",
        },
        {
            // icon: <PiFadersBold/>,
            icon: <LuUser/>,
            title: "My Profile",
            link: "/my-profile",
        },
        {
            icon: <BiSupport/>,
            title: "Support",
            link: "/support",
        },
    ]

    const handleLinkClick = async(e, index, link) =>{
        // e.preventDefault()
        setLinkClicked(index)
        navigate(link)
        console.log("clicked: ", index, link)
    }

    //Animation variants
    const sidebarVariants = {
        open: { width:"224px", x:0, opacity:1,  transition:{duration:0.8} },
        closed: { width:"64px", x:0, opacity:1, transition:{duration:0.8} }
    }


    return (
    <section className="fixed h-full flex z-40 ">
      <motion.div
        initial="open"
        animate={showSidebar ? "open" : "closed"}
        variants={sidebarVariants}
        className="h-full overflow-hidden"
      >
        {
            showSidebar ? (
                <section className={`w-56 h-full p-2 bg-gray-700 flex flex-col gap-12 pt-8 relative `}>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <div className='h-24 w-24 border border-gray-500 rounded-full flex justify-center items-center'>
                            <img src={user?.profilePic || profileImg} alt='profile' className='w-24 h-24 object-cover rounded-full'/>
                        </div>
                        <span className='inline-block font-semibold text-xl'>{user?.firstName} {user?.lastName}</span>
                    </div>
                    <div className='flex flex-col justify-center h-full gap-4 pl-4'>
                        {
                            navArray.map((data, index)=>{
                                return (
                                    <Link key={index} to={data.link} className={`nav-link flex items-center gap-2 text-xl hover:bg-gray-800 rounded-lg p-2 cursor-pointer ${ linkClicked===index ? "bg-gray-800 text-white" : "hover:bg-gray-800"}`} onClick={(e)=>handleLinkClick(e,index, data.link)} >
                                        <i onClick={()=>dispatch(setShowSidebar(false))}>{data.icon}</i>
                                        <p>{data.title}</p>
                                    </Link>
                                )
                            })
                        }
                    </div>
                    <div className='flex justify-center items-center gap-2'>
                        <img src={logo} alt='logo' className='w-6 h-6'/>
                        <p className='text-sm  '>WealthWay</p>
                    </div>

                    <i className='absolute text-2xl right-2 -mt-2 cursor-pointer' onClick={()=>dispatch(toggleSidebar())}><LuPanelRightOpen/></i>
                </section>    
            ) : (
                <section className={`w-16 h-full pt-52 p-2 bg-gray-700 flex flex-col gap-12 relative`}>
                    <div className='flex flex-col justify-center h-full gap-6 py-2 -mt-9'>
                        {
                            navArray.map((data, index)=>{
                                return (
                                    <Link key={index} to={data.link} className={`flex justify-center  gap-2 text-xl hover:bg-gray-800 rounded-lg p-2 cursor-pointer ${ linkClicked===index ? "bg-gray-800 text-white" : "hover:bg-gray-800"}`} onClick={(e)=>handleLinkClick(e,index, data.link)} >
                                        <i className='text-xl' >{data.icon}</i>
                                    </Link>
                                )
                            })
                        }
                    </div>

                    <i className='absolute text-2xl right-2 -mt-46 cursor-pointer' onClick={()=>dispatch(toggleSidebar())} ><LuPanelRightClose/></i>
                </section>
            )
        }
      </motion.div>
    </section>
  )
}

export default Navbar