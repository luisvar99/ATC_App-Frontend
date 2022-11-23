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
import Reservaciones from './Components/Common/Reservaciones';
import TennisReservation from './Components/Canchas/TennisReservation';
import TennisReservationForm from './Components/Canchas/TennisReservationForm';
import ReservationDetails from './Components/Reservations/ReservationDetails';
import ManageUsers from './Components/Admin/ManageUsers';
import AddUser from './Components/Admin/AddUser';
import PrivateRoutes from './Components/PrivateRoutes/PrivateRoutes';
import AdminPrivateRoutes from './Components/PrivateRoutes/AdminPrivateRoutes';
import NotFoundPage from './Components/Common/NotFoundPage';


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

          <Route path="/admin" 
          element={
            <AdminPrivateRoutes user={sessionStorage.getItem('userRole')}>
                <AdminDashboard/>
            </AdminPrivateRoutes>
          }/>

        {/* <Route path="/admin" element={<AdminDashboard/>}/> */}  

        <Route path="/admin/manageCanchas" 
          element={
            <AdminPrivateRoutes user={sessionStorage.getItem('userRole')}>
                <ManageCanchas/>
            </AdminPrivateRoutes>
          }/>     

        {/* <Route path="/admin/manageCanchas" element={<ManageCanchas/>}/> */}  

        <Route path="/admin/manageCanchas/addCancha" 
          element={
            <AdminPrivateRoutes user={sessionStorage.getItem('userRole')}>
                <AddCanchas/>
            </AdminPrivateRoutes>
          }/>     

        {/* <Route path="/admin/manageCanchas/addCancha" element={<AddCanchas/>}/> */}   

        
        <Route path="/admin/manageCanchas/editCancha/id=:idCancha" 
          element={
            <AdminPrivateRoutes user={sessionStorage.getItem('userRole')}>
                <EditCancha/>
            </AdminPrivateRoutes>
          }/>    

        {/* <Route path="/admin/manageCanchas/editCancha/id=:idCancha" element={<EditCancha/>}/> */} 

        <Route path="/torneos/:nombreTorneo/id=:idTorneo" 
          element={
            <PrivateRoutes user={sessionStorage.getItem('userId')}>
                <TorneoDetails/>
            </PrivateRoutes>
          }/>      

        {/* <Route path="/torneos/:nombreTorneo/id=:idTorneo" element={<TorneoDetails/>}/> */}  

        <Route path="/admin/manageTorneos" 
          element={
            <AdminPrivateRoutes user={sessionStorage.getItem('userRole')}>
                <ManageTorneos/>
            </AdminPrivateRoutes>
          }/>     
      
        {/* <Route path="/admin/manageTorneos" element={<ManageTorneos/>}/> */}    

        <Route path="/admin/manageTorneos/addTorneo" 
          element={
            <AdminPrivateRoutes user={sessionStorage.getItem('userRole')}>
                <AddTorneo/>
            </AdminPrivateRoutes>
          }/>  
     
        {/* <Route path="/admin/manageTorneos/addTorneo" element={<AddTorneo/>}/> */}

        <Route path="/admin/manageTorneos/editTorneo/id=:idTorneo" 
          element={
            <AdminPrivateRoutes user={sessionStorage.getItem('userRole')}>
                <EditTorneo/>
            </AdminPrivateRoutes>
          }/>      

        {/* <Route path="/admin/manageTorneos/editTorneo/id=:idTorneo" element={<EditTorneo/>}/> */}      
      
        <Route path="/admin/manageTorneos/addCompetencia/:nombreTorneo/idTorneo=:idTorneo" 
          element={
            <AdminPrivateRoutes user={sessionStorage.getItem('userRole')}>
                <AddSubTorneo/>
            </AdminPrivateRoutes>
          }/>

        {/* <Route path="/admin/manageTorneos/addCompetencia/:nombreTorneo/idTorneo=:idTorneo" element={<AddSubTorneo/>}/> */}      

        <Route path="/admin/manageTorneos/editTorneo/id=:idTorneo/editSubtorneo/id=:idSubtorneo" 
          element={
            <AdminPrivateRoutes user={sessionStorage.getItem('userRole')}>
                <EditSubtorneo/>
            </AdminPrivateRoutes>
          }/>
        
        {/* <Route path="/admin/manageTorneos/editTorneo/id=:idTorneo/editSubtorneo/id=:idSubtorneo" element={<EditSubtorneo/>}/> */}      

        <Route path="/admin/manageUsuarios" 
          element={
            <AdminPrivateRoutes user={sessionStorage.getItem('userRole')}>
                <ManageUsers/>
            </AdminPrivateRoutes>
          }/>

        {/* <Route path="/admin/manageUsuarios" element={<ManageUsers/>}/> */} 

        <Route path="/admin/addNewUser" 
          element={
            <AdminPrivateRoutes user={sessionStorage.getItem('userRole')}>
                <AddUser/>
            </AdminPrivateRoutes>
          }/>     

        {/* <Route path="/admin/addNewUser" element={<AddUser/>}/> */}   
        
        <Route path="/torneos" 
          element={
            <PrivateRoutes user={sessionStorage.getItem('userId')}>
                <TorneosDashboard/>
            </PrivateRoutes>
          }/> 

        {/* <Route path="/torneos" element={<TorneosDashboard/>}/> */}

        <Route path="/torneos/:nombreTorneo/id=:idTorneo/subtorneos/:categoria/id=:idSubTorneo/modalidad=:modalidad" 
          element={
            <PrivateRoutes user={sessionStorage.getItem('userId')}>
                <SubtorneoDetails/>
            </PrivateRoutes>
          }/> 

        {/* <Route path="/torneos/:nombreTorneo/id=:idTorneo/subtorneos/:categoria/id=:idSubTorneo/modalidad=:modalidad" element={<SubtorneoDetails/>}/> */}      

        <Route path="/Reservaciones" 
          element={
            <PrivateRoutes user={sessionStorage.getItem('userId')}>
                <Reservaciones/>
            </PrivateRoutes>
          }/> 

        {/* <Route path="/Reservaciones" element={<Reservaciones/>}/>       */}
      

        <Route path="/Reservaciones/tennis/idCancha=:idCancha/:ano-:mes-:dia" 
          element={
            <PrivateRoutes user={sessionStorage.getItem('userId')}>
                <TennisReservation/>
            </PrivateRoutes>
          }/> 

        {/* <Route path="/Reservaciones/tennis/idCancha=:idCancha/:ano-:mes-:dia" element={<TennisReservation/>}/> */}      
 
        <Route path="/MakeReservation/idCancha=:idCancha/idHorario=:idHorario/:ano-:mes-:dia" 
          element={
            <PrivateRoutes user={sessionStorage.getItem('userId')}>
                <TennisReservationForm/>
            </PrivateRoutes>
          }/> 
          
        {/* <Route path="/MakeReservation/idCancha=:idCancha/idHorario=:idHorario/:ano-:mes-:dia" element={<TennisReservationForm/>}/> */}      

        <Route path="/ReservationDetails/idReserva=:idReserva/cancha=:idCancha" 
          element={
            <PrivateRoutes user={sessionStorage.getItem('userId')}>
                <ReservationDetails/>
            </PrivateRoutes>
          }/>

        {/* <Route path="/ReservationDetails/idReserva=:idReserva/cancha=:idCancha" element={<ReservationDetails/>}/> */}      

        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
      
  </BrowserRouter>
  );
}

export default App;
