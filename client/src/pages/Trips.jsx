import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa'

const Trips = () => {
  const [loading, setLoading] = useState(false)
  // const [sorted, setSorted] = useState(false);
  const [sortType, setSortType] = useState('');
  const [filtered, setFiltered] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showDesc, setShowDesc] = useState(false);
  const [descData, setDescData] = useState({ title: '', description: '' , invoice:''})
  const [filterValues, setFilterValues] = useState({
    types: [],
    minAmount: '',
    maxAmount: '',
    startDate: '',
    endDate: '',
    status: ''
  });
  const {user} = useSelector(state => state.auth)
  const [showUpdateBox, setShowUpdateBox] = useState(false)
  const [editData, setEditData] = useState(null)
  
  // const [filteredData, setFilteredData] = useState([])
  // const [sortType, setSortType] = useState("")

  useEffect(()=>{
    const isFiltered = filterValues.types.length>0 || filterValues.minAmount || filterValues.maxAmount || filterValues.startDate || filterValues.endDate || filterValues.status
    setFiltered(isFiltered)
  }, [filterValues])

  const [expenseArray, setExpenseArray] = useState([])
  
  const fetchExpenseArray = async() =>{
    try {
      console.log("userId: ", user.userId)
      const response = await fetch(`${SummaryApi.fetchExpenses.url}?userId=${user.userId}` ,{
        method: SummaryApi.fetchExpenses.method,
        credentials: 'include',
        headers: {
          "content-type" : "application/json",
        },
        // body: JSON.stringify({userId: user.userId})
      })
      const responseData = await response.json()
      console.log("response done ")
    
      if(responseData.success){
        // setExpenseArray(responseData.data)
        // alert("data fetch success")
        const reversedArray = responseData.data.slice().reverse();
        setExpenseArray(reversedArray)
      }
      if(responseData.error){
        toast.error("Some error occurred in backend", responseData.error)
      }

    } catch (error) {
      toast.error("Some error occurred while fetch expenses", error) 
    }
  }

  useEffect(()=>{
    const handleLoading = async () => {
      setLoading(true);
      await fetchExpenseArray();
      setLoading(false);
    };
    handleLoading();
  }, [])

  
  // console.log("array length", earningArray.length)
  
  const [sortedExpenses, setSortedExpenses] = useState(expenseArray)
  const [filteredExpense, setFilteredExpense] = useState(expenseArray)

  
  useEffect(()=>{
    let result = [...expenseArray]

    //apply filters
    if(filterValues.types.length>0){
      result = result.filter(item => filterValues.types.includes(item.type))
    }
    if(filterValues.status){
      result = result.filter(item=>item.status===filterValues.status)
    }
    if(filterValues.minAmount){
      result = result.filter(item=>Number(item.amount)>=Number(filterValues.minAmount))
    }
    if(filterValues.maxAmount){
      result = result.filter(item=>Number(item.amount)<=Number(filterValues.maxAmount))
    }
    if (filterValues.startDate) {
      result = result.filter(item => new Date(item.date) >= new Date(filterValues.startDate));
    }
    if (filterValues.endDate) {
      result = result.filter(item => new Date(item.date) <= new Date(filterValues.endDate));
    }

    if(sortType==='amount'){
      result.sort((a,b)=>b.amount-a.amount)

    }else if(sortType==='date'){
      result.sort((a,b)=>new Date(b.date)-new Date(a.date))
    }

    setSortedExpenses(result)
  }, [filterValues, sortType, expenseArray])
  const isSorted = sortType !== '';

  const handleApplyFilter = (e) =>{
    e.preventDefault()
    const formData = new FormData(e.target)

    const filters = {
      types: formData.getAll('types'),
      minAmount: formData.get('minAmount'),
      maxAmount: formData.get('maxAmount'),
      startDate: formData.get('startDate'),
      endDate: formData.get('endDate'),
      status: formData.get('status'),
    }

    const filtered = expenseArray.filter((item)=>{
      const matchesType = filters.types.length===0 || filters.types.includes(item.type)
      const matchesAmount = (!filters.minAmount || item.amount>=Number(filters.minAmount)) && (!filters.maxAmount || item.amount<=Number(filters.maxAmount))
      const matchesDate = (!filters.startDate || item.date>=filters.startDate) && (!filters.endDate || item.date<=filters.endDate)
      const matchesStatus = !filters.status || item.status===filters.status

      return matchesType && matchesAmount && matchesDate && matchesStatus
    })

    setFilterValues(filters)
    console.log("Applied filters:", filters)
    setShowFilter(false)
  }

  const handleExcelMerge = async(e) =>{
    const file = e.target.files[0]
    MergeUploadedFile(file, expenseArray, setExpenseArray, user.userId, 'expenses')
    // await uploadMergedData()
    console.log("handleExcelUpload", sortedExpenses.length)
  }

  const handleDescription = (item) =>{
    // <ShowDescription title={title} desc={desc}/>
    setDescData({title:item.title, description:item.description, invoice:item.invoice})
    setShowDesc(true)
  }

  const handleDelete = async(dataId) =>{
    try{
      const response = await fetch(`${SummaryApi.deleteExpense.url}?dataId=${dataId}`, {
        method: SummaryApi.deleteExpense.method,
        credentials: 'include',
        headers: {
          'content-type' : 'application/json'
        }
      })
      const responseData = await response.json()
  
      if(responseData.success){
        setSortedExpenses(prev => prev.filter(item=>item._id!==dataId))
        toast.success(responseData.message)
      }
      if(responseData.error){
        toast.error(responseData.message)
      }
    }
    catch(error){
      toast.warning("Error occurred in handleDelete", error)
    }
  }
  
  const handleEdit = async(data) =>{
    setEditData(data)
    setShowUpdateBox(true)
  }

  const handleSave = async(editData) =>{
    console.log("editData :", editData)
    try {
      const response = await fetch(SummaryApi.editExpense.url, {
        method: SummaryApi.editExpense.method,
        credentials: 'include',
        headers :{
          'content-type' : 'application/json'
        },
        body : JSON.stringify(editData)
      })

      const responseData = await response.json()
      if(responseData.success){
        toast.success(responseData.message)
        //update UI
        setSortedExpenses(prev => 
          prev.map(item => item._id===editData._id ? editData : item)
        )
      }
      if(responseData.error){
        toast.error(responseData.message)
      }
    } catch (error) {
      toast.warning("Some error occurred in editing", error)
    }
  }

  const handleDownload = () =>{
    ConvertToExcel({array:sortedExpenses, fileName: 'Expenses data.xlsx'})
  }

  const loadingArray = new Array(5).fill(null)
  return (
    <section className='p-4 pb-0 overflow-y-hidden'>
      <div className='flex items-center justify-between max-md:flex-col max-md:gap-2'>
        <h2 className='color-minus font-bold'>Expenses</h2>
        {/* <span className='opacity-50 max-md:hidden'>Total expenses: {sortedExpenses.length}</span> */}
        <div className='flex max-md:flex-wrap gap-2 items-center justify-center'>
          <Link to='/new-expense' className='btn btn-bg btn-minus flex gap-2 items-center justify-center'>
            <i><FaPlus/></i>
            <p>New Trip</p>
          </Link>
          <label title='Merge file' htmlFor='upload-file' className='btn btn-bg btn-minus p-1 rounded'>
            <FaFileUpload/>
            <input id='upload-file' type='file' accept='.xlsx, .xls' onChange={handleExcelMerge} className='hidden'/>
          </label>
          <section>
            <label title='filter' onClick={()=>setShowFilter(true)} className={`relative rounded 
              ${showFilter||filtered ? 'flex items-center btn bg-[#FF2410] text-[#FFFFFFDE] p-1 rounded hover:text-[#FFFFFFDE]' 
              : 'flex items-center btn btn-bg btn-minus p-1 rounded' } `} >
              <FaFilter className='text-lg' />
            </label>
            <FilterArray 
              name={'Expense'} 
              earningArray={expenseArray} 
              show={showFilter}
              setShow={setShowFilter}
              onClose={()=>setShowFilter(false)} 
              onApply={handleApplyFilter}
              filterValues={filterValues}
              setFilterValues={setFilterValues} 
              setFilteredEarning={setFilteredExpense}
            />
          </section>
          <label title='sort' className={`relative rounded 
            ${isSorted ? 'flex items-center btn bg-[#FF2410] text-[#FFFFFFDE] p-1 rounded hover:text-[#FFFFFFDE]' 
            : 'flex items-center btn btn-bg btn-minus p-1 rounded' }`}>
            <div className='flex items-center cursor-pointer'>
              <MdSort className='text-lg' />
              <select id="sort-type" name="sort-type" value={sortType} onChange={(e) => setSortType(e.target.value)}
                className="bg-[#1f1f1f] text-white text-sm px-0 py-[2px] rounded outline-none cursor-pointer absolute inset-0 opacity-0 w-12"
              >
                <option value="">none</option>
                <option value="amount">by Amount</option>
                <option value="date">by Date</option>
              </select>
            </div>
          </label>
          <i title='download' onClick={handleDownload} className='btn btn-bg btn-plus p-1 rounded'>
              <FiDownload/>
          </i>
        </div>
      </div>

      <div className='w-full h-[0.5px] bg-slate-600 mt-4'></div>

      <section className='p-1 max-md:flex'>
        <div className='flex min-md:justify-between mb-6 mr-4 max-md:flex-col max-md:gap-2 max-sm:text-[10px] max-[400px]:hidden'>
          <h6 className='font-bold min-md:w-[20%] text-center'>Title</h6>
          <h6 className='font-bold min-md:w-[16%] text-center'>Type</h6>
          <h6 className='font-bold min-md:w-[16%] text-center'>Amount</h6>
          <h6 className='font-bold min-md:w-[16%] text-center'>Date</h6>
          <h6 className='font-bold min-md:w-[16%] text-center'>Status</h6>
          <h6 className='font-bold min-md:w-[16%] text-center'>Action</h6>
        </div>
        <section className='h-[calc(100vh-145px)] max-md:w-full max-md:gap-4 overflow-y-scroll'>
          { 
            loading ? (
              loadingArray.map((el, index) =>{
                return (
                  <div key={index} className='flex screen-md justify-around items-center min-h-16 h-fit py-1 max-md:h-fit max-md:py-2 odd:bg-[#333333] even:bg-[#404040]'>
                    <div className='min-md:w-[20%] flex items-center gap-2 font-semibold min-md:pl-8 max-md:px-1'>
                      <i className='w-6 h-6 btn-bg rounded-md animate-pulse'></i>
                      <p className='w-36 h-6 btn-bg rounded-md animate-pulse'></p>
                    </div>
                    <p className='mx-auto w-24 h-6 btn-bg rounded-md animate-pulse'></p>
                    <p className='mx-auto w-24 h-6 btn-bg rounded-md animate-pulse'></p>
                    <p className='mx-auto w-24 h-6 btn-bg rounded-md animate-pulse'></p>
                    <p className='mx-auto w-24 h-6 btn-bg rounded-md animate-pulse'>
                      <span></span>
                    </p>
                    <div className='min-md:w-[16%] text-center flex flex-row-reverse gap-4 items-center pr-4'>
                      <i className='w-6 h-6 p-2 rounded-full btn-bg animate-pulse'></i>
                      <i className='w-6 h-6 p-2 rounded-full btn-bg animate-pulse'></i>
                      <i className='w-6 h-6 p-2 rounded-full btn-bg animate-pulse'></i>
                    </div>
                  </div>
                )
              })
            ) : (
              
              sortedExpenses.map((data, index)=>{
                return(
                  <div key={index} className='flex screen-md justify-around items-center min-h-16 h-fit py-1 max-md:h-fit max-md:py-2 odd:bg-[#333333] even:bg-[#404040]'>
                    <div className='min-md:w-[20%] flex items-center gap-2 font-semibold min-md:pl-8 max-md:px-1'>
                      <i>{iconMap[data.type]}</i>
                      <p>{data.title}</p>
                    </div>
                    <p className='min-md:w-[16%] text-center'>{data.type}</p>
                    <p className='min-md:w-[16%] text-center'>₹ {data.amount}</p>
                    <p className='min-md:w-[16%] text-center'>{new Date(data.date).toISOString().split('T')[0]}</p>
                    <p className={`min-md:w-[16%] text-center ` }>
                      <span className={`inline-block w-fit ${data.status==='Completed' ?"color-plus":"color-minus"} rounded-full px-2 text-[#404040] font-semibold`}>{data.status}</span>
                    </p>
                    <div className='min-md:w-[16%] text-center flex gap-4 justify-center items-center '>
                      {data?.description ? ( <i onClick={()=>handleDescription(data)} className='w-fit h-fit p-2 rounded-full btn-bg btn-minus cursor-pointer'><LuExpand/></i> ) : (<i className='h-8 w-8'></i>)}
                      <i onClick={()=>handleEdit(data)} className='w-fit p-2 rounded-full btn-bg btn-plus cursor-pointer'> <MdModeEditOutline/> </i>
                      <i onClick={()=>handleDelete(data._id)} className='w-fit p-2 rounded-full btn-bg btn-minus cursor-pointer'><MdDelete/></i>
                    </div>
                  </div>
                )
              })
            )
            
          }
          {expenseArray.length===0 && <div className='opacity-50 text-center '>Nothing to display, try adding from above.</div>}
        </section>
        
      </section>
      <ShowDescription open={showDesc} onClose={()=>setShowDesc(false)} data={descData}/> 
      {/* <ShowDescription open={showDesc} onClose={()=>setShowDesc(false)} title={descData.title} desc={descData.description} invoice={descData.invoice}/>  */}
      <UpdateExpense open={showUpdateBox} onClose={()=>setShowUpdateBox(false)} initialData={editData} onSave={handleSave}/>
    </section>
  )
}

export default Trips