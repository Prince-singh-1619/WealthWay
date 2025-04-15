import React, { useEffect, useRef } from 'react'
import { IoCloseSharp } from 'react-icons/io5'

const ShowDescription = ({open, onClose, data}) => {

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
    <section className='fixed inset-0 backdrop-blur-xs w-full h-full flex justify-center items-center z-50 overflow-y-scroll' >
        <div ref={dialogRef} className='w-fit min-md:min-w-100 max-md:w-[85%] h-fit py-6 p-8 bg-[#212121] rounded-xl shadow-lg  relative'>
            <div className='flex gap-2 text-lg mb-2'>
                <p className='opacity-65'>Title: </p>
                <p className='font-bold '>{data.title}</p>
            </div>
            <p className='opacity-65'>Description:</p>
            <p>{data.description}</p>
            {data?.invoice && <img src={data.invoice} alt={`${data.title}'s invoice`} className='h-128 w-128'/>}
            <button onClick={onClose} className='btn btn-bg btn-minus absolute top-2 right-2 text-2xl'><IoCloseSharp/> </button>
        </div>
    </section>
  )
}

export default ShowDescription