import {BrowserRouter, 
  Routes,
  Route} 
  from 'react-router-dom'

import './App.css';
import Login from './Components/Auth/Login';
import Dashboard from './Components/Dashboard/TorneosDashboard';
import AdminDashboard from './Components/Admin/AdminDashboard';
import ManageCanchas from './Components/Admin/ManageCanchas';
import AddCanchas from './Components/Admin/AddCanchas';
import EditCancha from './Components/Admin/EditCancha';
import SignUp from './Components/Auth/SignUp';
import Home from './Components/Common/Home';
import TorneosDashboard from './Components/Dashboard/TorneosDashboard';
import NavBar from './Components/Common/NavBar';
import ManageTorneos from './Components/Admin/ManageTorneos';
import AddTorneo from './Components/Admin/AddTorneo';
import EditTorneo from './Components/Admin/EditTorneo';

function App() {
  return (
    <BrowserRouter>
    <NavBar/>
      <Routes>
        <Route path="/" exact element={<Login/>}/>      
      </Routes>
      
      <Routes>
        <Route path="/signup" element={<SignUp/>}/>      
      </Routes>

      <Routes>
        <Route path="/home" element={<Home/>}/>      
      </Routes>

      <Routes>
        <Route path="/admin" element={<AdminDashboard/>}/>       
      </Routes>

      <Routes>
        <Route path="/admin/manageCanchas" element={<ManageCanchas/>}/>      
      </Routes>

      <Routes>
        <Route path="/admin/manageCanchas/addCancha" element={<AddCanchas/>}/>      
      </Routes>

      <Routes>
        <Route path="/admin/manageCanchas/editCancha/id=:idCancha" element={<EditCancha/>}/>      
      </Routes>
      
      <Routes>
        <Route path="/torneos" element={<TorneosDashboard/>}/>      
      </Routes>
      
      <Routes>
        <Route path="/admin/manageTorneos" element={<ManageTorneos/>}/>      
      </Routes>
     
      <Routes>
        <Route path="/admin/manageTorneos/addTorneo" element={<AddTorneo/>}/>      
      </Routes>

      <Routes>
        <Route path="/admin/manageTorneos/editTorneo/id=:idTorneo" element={<EditTorneo/>}/>      
      </Routes>
      
</BrowserRouter>
  );
}

export default App;
