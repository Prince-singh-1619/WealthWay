import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import './App.css'
import Home from './pages/Home'
import Expense from './pages/Expense'
import Trips from './pages/Trips'
import Earnings from './pages/Earnings'
import MyProfile from './pages/MyProfile'
import Support from './pages/Support'
import Navbar from './components/Navbar'
import NewExpense from './pages/NewExpense';
import NewEarning from './pages/NewEarning';
import ProtectedRoute from './helpers/ProtectedRoute';
import PublicOnlyRoute from './helpers/PublicOnlyRoute ';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { ToastContainer } from 'react-toastify';
import EditProfile from './pages/EditProfile';
import ShowDescription from './helpers/ShowDescription';
import { useSelector } from 'react-redux';

const Layout = () => {
  const sidebar = useSelector(state => state.navData.showSidebar);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Navbar/>

      <main style={{ flex: 1 }} className={`max-md:ml-14 transition-all duration-800  ${sidebar ? 'ml-54' : 'ml-14'}`}>
        <Outlet/>
      </main>
      {/* <div className="w-full max-md:ml-14"> 
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/expense" element={<Expense/>} />
          <Route path="/trips" element={<Trips/>} />
          <Route path="/earnings" element={<Earnings/>} />
          <Route path="/my-profile" element={<MyProfile/>} />
          <Route path="/support" element={<Support/>} />
          <Route path="/new-expense" element={<NewExpense/>} />
          <Route path="/new-earning" element={<NewEarning/>} />
        </Routes>
      </div> */}

    </div>
  )
};


function App() {

  return (
    <Router >
      <ToastContainer position="top-center"/>
      <Routes>
        <Route path="/login" element={<PublicOnlyRoute> <Login/> </PublicOnlyRoute>}/>
        <Route path="/signup" element={<PublicOnlyRoute> <SignUp/> </PublicOnlyRoute>}/>
        <Route className='max-md:ml-14' element={<ProtectedRoute> <Layout/> </ProtectedRoute>} >
          <Route path="/" element={<Home/>} />
          <Route path="/expense" element={<Expense/>} />
          <Route path="/trips" element={<Trips/>} />
          <Route path="/earnings" element={<Earnings/>} />
          <Route path="/my-profile" element={<MyProfile/>} />
          <Route path="/support" element={<Support/>} />
          <Route path="/new-expense" element={<NewExpense/>} />
          <Route path="/new-earning" element={<NewEarning/>} />
          <Route path="/edit-profile" element={<EditProfile/>} />


          {/* <Route path="/show" element={<ShowDescription/>} /> */}
        </Route>
      </Routes>
    </Router>
  )
}

export default App
