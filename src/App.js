import {BrowserRouter, 
  Routes,
  Route} 
  from 'react-router-dom'
  
import React, {useState } from 'react'

import './App.css';
import Login from './Components/Auth/Login';
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
import AddSubTorneo from './Components/Admin/AddSubTorneo';
import TorneoDetails from './Components/Torneos/TorneoDetails';
import SubtorneoDetails from './Components/Torneos/SubtorneoDetails';
import EditSubtorneo from './Components/Admin/EditSubtorneo';
/* import PrivateRoutes from './Components/PrivateRoutes/PrivateRoutes';
import UserContext from './Components/Context/UserContext'; */
import Reservaciones from './Components/Common/Reservaciones';
import TennisReservation from './Components/Canchas/TennisReservation';
import TennisReservationForm from './Components/Canchas/TennisReservationForm';
import ReservationDetails from './Components/Reservations/ReservationDetails';
import ManageUsers from './Components/Admin/ManageUsers';
import AddUser from './Components/Admin/AddUser';
import PrivateRoutes from './Components/PrivateRoutes/PrivateRoutes';


function App() {
  
  return (
  <BrowserRouter>
    <NavBar/>
      <Routes>
        <Route path="/" exact element={<Login/>}/>      
      
        <Route path="/signup" element={<SignUp/>}/>      

          <Route path="/home" 
          element={
            <PrivateRoutes user={sessionStorage.getItem('userId')}>
                <Home/>
            </PrivateRoutes>
          }/> 

        <Route path="/admin" element={<AdminDashboard/>}/>       

        <Route path="/admin/manageCanchas" element={<ManageCanchas/>}/>      

        <Route path="/admin/manageCanchas/addCancha" element={<AddCanchas/>}/>      

        <Route path="/admin/manageCanchas/editCancha/id=:idCancha" element={<EditCancha/>}/>      
      
        <Route path="/torneos" element={<TorneosDashboard/>}/>      

        <Route path="/torneos/:nombreTorneo/id=:idTorneo" element={<TorneoDetails/>}/>      
      
        <Route path="/admin/manageTorneos" element={<ManageTorneos/>}/>      
     
        <Route path="/admin/manageTorneos/addTorneo" element={<AddTorneo/>}/>      

        <Route path="/admin/manageTorneos/editTorneo/id=:idTorneo" element={<EditTorneo/>}/>      
      
        <Route path="/admin/manageTorneos/addCompetencia/:nombreTorneo/idTorneo=:idTorneo" element={<AddSubTorneo/>}/>      

        <Route path="/torneos/:nombreTorneo/id=:idTorneo/subtorneos/:categoria/id=:idSubTorneo/modalidad=:modalidad" element={<SubtorneoDetails/>}/>      

        <Route path="/admin/manageTorneos/editTorneo/id=:idTorneo/editSubtorneo/id=:idSubtorneo" element={<EditSubtorneo/>}/>      

        <Route path="/Reservaciones" element={<Reservaciones/>}/>      
      
        <Route path="/Reservaciones/tennis/idCancha=:idCancha/:ano-:mes-:dia" element={<TennisReservation/>}/>      
 
        <Route path="/MakeReservation/idCancha=:idCancha/idHorario=:idHorario/:ano-:mes-:dia" element={<TennisReservationForm/>}/>      

        <Route path="/ReservationDetails/idReserva=:idReserva/cancha=:idCancha" element={<ReservationDetails/>}/>      

        <Route path="/admin/manageUsuarios" element={<ManageUsers/>}/>      

        <Route path="/admin/addNewUser" element={<AddUser/>}/>      
      </Routes>
      
  </BrowserRouter>
  );
}

export default App;
