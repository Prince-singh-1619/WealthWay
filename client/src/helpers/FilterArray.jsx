import React from 'react'
import { IoCloseSharp } from 'react-icons/io5';

const FilterArray = ({name, earningArray, show, setShow, onClose, onApply, filterValues, setFilterValues, setFilteredEarning}) => {
  if (!show) return null;

  let typeArray = []
  if(name==='Expense'){
    typeArray = ["Food & Essentials", "Transport", "Education", "Healthcare", "Entertainment", "Shopping", "Utilities", "Rent", "Housing", "Subscriptions", "Others"]
  }
  if(name==='Earning'){
    typeArray = ["Salary", "Freelance", "Business", "Investment", "Interest", "Gift", "Refund", "Rent", "Selling", "Bonus", "Others"]
  }

  const handleTypeChange = (e) =>{
    const value = e.target.value
    const updatedTypes = filterValues.types.includes(value) 
      ? (filterValues.types.filter((v)=>v!==value)) : ([...filterValues.types, value])
    setFilterValues({...filterValues, types:updatedTypes})
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full backdrop-blur-xs bg-opacity-40 z-50 flex justify-center items-center overflow-y-scroll">
      <div className="bg-[#1e1e1e] rounded-2xl shadow-lg p-6 w-[90%] max-w-md text-white ">

        <div className='max-[400px]:mt-52 relative'>
          <button onClick={onClose} className="absolute btn btn-bg btn-minus top-3 -right-4 text-4xl">
            <IoCloseSharp/>
          </button>

          <h2 className="text-2xl font-bold mb-4 text-center">Filter {name}s</h2>
        </div>


        <form onSubmit={onApply} className="flex flex-col gap-5">

          {/* Earning Types */}
          <div>
            <label className="block text-lg font-semibold mb-2">{name} Types:</label>
            <div className="grid grid-cols-3 max-[400px]:grid-cols-2 gap-2">
              {typeArray.map((type, index) => (
                <label key={index} className="flex items-center gap-2">
                  <input type="checkbox" value={type} name="types" checked={filterValues.types.includes(type)} onChange={handleTypeChange} className="accent-green-400" />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Amount Range */}
          <div>
            <label className="block text-lg font-semibold mb-2">Amount Range:</label>
            <div className="flex gap-3 max-[400px]:flex-wrap">
              <input type="number" name="minAmount" value={filterValues.minAmount} onChange={(e)=>setFilterValues({...filterValues, minAmount:e.target.value})} placeholder="Min" className="input-field w-full" />
              <input type="number" name="maxAmount" value={filterValues.maxAmount} onChange={(e)=>setFilterValues({...filterValues, maxAmount:e.target.value})} placeholder="Max" className="input-field w-full" />
            </div>
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-lg font-semibold mb-2">Date Range:</label>
            <div className="flex gap-3 max-[400px]:flex-wrap">
              <input type="date" name="startDate" value={filterValues.startDate} onChange={(e)=>setFilterValues({...filterValues, startDate:e.target.value})} className="input-field w-full" />
              <input type="date" name="endDate" value={filterValues.endDate} onChange={(e)=>setFilterValues({...filterValues, endDate:e.target.value})} className="input-field w-full" />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-lg font-semibold mb-2">Status:</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-1">
                <input type="radio" name="status" value={name==="Earning" ? "Received" : "Completed"} checked={filterValues.status==='Received' || filterValues.status==='Completed'} onChange={(e)=>setFilterValues({...filterValues, status:e.target.value})} className="accent-green-400" />
                {name==="Earning" ? "Received" : "Completed"}
              </label>
              <label className="flex items-center gap-1">
                <input type="radio" name="status" value="Pending" checked={filterValues.status==='Pending'} onChange={(e)=>setFilterValues({...filterValues, status:e.target.value})} className="accent-green-400" />
                Pending
              </label>
            </div>
          </div>
          
          <div className='flex gap-2'>
            {/* Reset needs to be functional */}
            <button onClick={() => {setFilterValues({types: [], minAmount: '', maxAmount: '', startDate: '', endDate: '', status: ''}); setFilteredEarning(earningArray) ; setShow(false) }} className="btn btn-bg btn-minus w-full mt-2">Reset</button>
            <button type="submit" className="btn btn-bg btn-plus w-full mt-2">Apply Filter</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FilterArray