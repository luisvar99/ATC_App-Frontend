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
import SubtorneoMatches from './Components/Admin/SubtorneoMatches';
import SubtorneoEnfrentamientos from './Components/Torneos/SubtorneoEnfrentamientos';
import ManageTorneoColores from './Components/Admin/ManageTorneoColores';
import TorneoColores from './Components/Torneos/TorneoColores';
import GetColoresParejas from './Components/Torneos/GetColoresParejas';
import ManageRondas from './Components/Admin/ManageRondas';
import EditRonda from './Components/Admin/EditRonda';
import ManageHorarios from './Components/Admin/ManageHorarios';
import ColoresEnfrentamientos from './Components/Torneos/ColoresEnfrentamientos';
import EditColoresEnfrentamiento from './Components/Admin/EditColoresEnfrentamiento';
import EditColoresEquipos from './Components/Admin/EditColoresEquipos';
import EditColoresGrupo from './Components/Admin/EditColoresGrupo';
import ColoresEnfrentamientosForUsers from './Components/Torneos/ColoresEnfrentamientosForUsers';
import EditUser from './Components/Admin/EditUser';
import UserProfile from './Components/Common/UserProfile';
import ResetPassword from './Components/Common/ResetPassword';


function App() {

  //console.log("Desde App: " + sessionStorage.getItem('userRole'));
  
  return (
  <BrowserRouter>
    <NavBar/>
      <Routes>
        <Route path="/" exact element={<Login/>}/>      
      
        <Route path="/signup" element={<SignUp/>}/>      

          <Route path="/home" 
          element={
            <PrivateRoutes>
                <Home/>
            </PrivateRoutes>
          }/> 

          <Route path="/admin" 
          element={
            <AdminPrivateRoutes>
                <AdminDashboard/>
            </AdminPrivateRoutes>
          }/>

          <Route path="/admin/torneosColores/:id" 
          element={
            <AdminPrivateRoutes>
                <ManageTorneoColores/>
            </AdminPrivateRoutes>
          }/>
          
          <Route path="/admin/torneosColores/:id/enfrentamientos" 
          element={
            <AdminPrivateRoutes>
                <ColoresEnfrentamientos/>
            </AdminPrivateRoutes>
          }/>

          <Route path="/admin/torneosColores/:id/enfrentamientos/id_partido=:id_partido" 
          element={
            <AdminPrivateRoutes>
                <EditColoresEnfrentamiento/>
            </AdminPrivateRoutes>
          }/>

          <Route path="/admin/torneosColores/:id/editEquipo/:id_equipo" 
          element={
            <AdminPrivateRoutes>
                <EditColoresEquipos/>
            </AdminPrivateRoutes>
          }/>

          <Route path="/admin/torneosColores/:id/editGrupo/:id_bombo" 
          element={
            <AdminPrivateRoutes>
                <EditColoresGrupo/>
            </AdminPrivateRoutes>
          }/>


          <Route path="/coloresParticipantes/:id" 
          element={
            <AdminPrivateRoutes>
                <GetColoresParejas/>
            </AdminPrivateRoutes>
          }/>

        {/* <Route path="/admin" element={<AdminDashboard/>}/> */}  

        <Route path="/admin/manageCanchas" 
          element={
            <AdminPrivateRoutes >
                <ManageCanchas/>
            </AdminPrivateRoutes>
          }/>     

        {/* <Route path="/admin/manageCanchas" element={<ManageCanchas/>}/> */}  

        <Route path="/admin/manageCanchas/addCancha" 
          element={
            <AdminPrivateRoutes >
                <AddCanchas/>
            </AdminPrivateRoutes>
          }/>     

        {/* <Route path="/admin/manageCanchas/addCancha" element={<AddCanchas/>}/> */}   

        
        <Route path="/admin/manageCanchas/editCancha/id=:idCancha" 
          element={
            <AdminPrivateRoutes >
                <EditCancha/>
            </AdminPrivateRoutes>
          }/>    

        {/* <Route path="/admin/manageCanchas/editCancha/id=:idCancha" element={<EditCancha/>}/> */} 

        <Route path="/torneos/:nombreTorneo/id=:idTorneo" 
          element={
            <PrivateRoutes>
                <TorneoDetails/>
            </PrivateRoutes>
          }/>      

        {/* <Route path="/torneos/:nombreTorneo/id=:idTorneo" element={<TorneoDetails/>}/> */}  

        <Route path="/admin/manageTorneos" 
          element={
            <AdminPrivateRoutes>
                <ManageTorneos/>
            </AdminPrivateRoutes>
          }/>     
      
        {/* <Route path="/admin/manageTorneos" element={<ManageTorneos/>}/> */}    

        <Route path="/admin/manageTorneos/addTorneo" 
          element={
            <AdminPrivateRoutes>
                <AddTorneo/>
            </AdminPrivateRoutes>
          }/>  
     
        {/* <Route path="/admin/manageTorneos/addTorneo" element={<AddTorneo/>}/> */}

        <Route path="/admin/manageTorneos/editTorneo/id=:idTorneo" 
          element={
            <AdminPrivateRoutes>
                <EditTorneo/>
            </AdminPrivateRoutes>
          }/>      

        {/* <Route path="/admin/manageTorneos/editTorneo/id=:idTorneo" element={<EditTorneo/>}/> */}      
      
        <Route path="/admin/manageTorneos/addCompetencia/:nombreTorneo/idTorneo=:idTorneo" 
          element={
            <AdminPrivateRoutes>
                <AddSubTorneo/>
            </AdminPrivateRoutes>
          }/>

        {/* <Route path="/admin/manageTorneos/addCompetencia/:nombreTorneo/idTorneo=:idTorneo" element={<AddSubTorneo/>}/> */}      

        <Route path="/admin/manageTorneos/editTorneo/id=:idTorneo/editSubtorneo/id=:idSubtorneo/modalidad=:modalidad" 
          element={
            <AdminPrivateRoutes>
                <EditSubtorneo/>
            </AdminPrivateRoutes>
          }/>
        
        {/* <Route path="/admin/manageTorneos/editTorneo/id=:idTorneo/editSubtorneo/id=:idSubtorneo" element={<EditSubtorneo/>}/> */}      

        <Route path="/admin/manageUsuarios" 
          element={
            <AdminPrivateRoutes>
                <ManageUsers/>
            </AdminPrivateRoutes>
          }/>

        {/* <Route path="/admin/manageUsuarios" element={<ManageUsers/>}/> */} 

        <Route path="/admin/addNewUser" 
          element={
            <AddUser/>
          }/>  

        <Route path="/admin/manageUsuarios/editUser/:user_id" 
          element={
            <AdminPrivateRoutes>
                <EditUser/>
            </AdminPrivateRoutes>
          }/>     

        <Route path="/createSubtorneoMatches/:idSubtorneo" 
          element={
            <AdminPrivateRoutes>
                <SubtorneoMatches/>
            </AdminPrivateRoutes>
          }/>
          
        <Route path="/admin/manageRondas" 
          element={
            <AdminPrivateRoutes>
                <ManageRondas/>
            </AdminPrivateRoutes>
          }/>   

        <Route path="/admin/manageRondas/editRonda/:id_ronda" 
          element={
            <AdminPrivateRoutes>
                <EditRonda/>
            </AdminPrivateRoutes>
          }/>    

        <Route path="/admin/manageHorarios" 
          element={
            <AdminPrivateRoutes>
                <ManageHorarios/>
            </AdminPrivateRoutes>
          }/>     

        {/* <Route path="/admin/addNewUser" element={<AddUser/>}/> */}   
        
        <Route path="/torneos" 
          element={
            <PrivateRoutes>
                <TorneosDashboard/>
            </PrivateRoutes>
          }/> 

        {/* <Route path="/torneos" element={<TorneosDashboard/>}/> */}

        <Route path="/torneos/:nombreTorneo/id=:idTorneo/subtorneos/:categoria/id=:idSubTorneo/modalidad=:modalidad" 
          element={
            <PrivateRoutes>
                <SubtorneoDetails/>
            </PrivateRoutes>
          }/> 

        {/* <Route path="/torneos/:nombreTorneo/id=:idTorneo/subtorneos/:categoria/id=:idSubTorneo/modalidad=:modalidad" element={<SubtorneoDetails/>}/> */}      

        <Route path="/Reservaciones" 
          element={
            <PrivateRoutes>
                <Reservaciones/>
            </PrivateRoutes>
          }/> 

        {/* <Route path="/Reservaciones" element={<Reservaciones/>}/>       */}
      

        <Route path="/Reservaciones/tennis/idCancha=:idCancha/:ano-:mes-:dia/categoriaCancha=:categoriaCancha" 
          element={
            <PrivateRoutes>
                <TennisReservation/>
            </PrivateRoutes>
          }/> 

        {/* <Route path="/Reservaciones/tennis/idCancha=:idCancha/:ano-:mes-:dia" element={<TennisReservation/>}/> */}      
 
        <Route path="/MakeReservation/idCancha=:idCancha/idHorario=:idHorario/:ano-:mes-:dia/categoriaCancha=:categoriaCancha" 
          element={
            <PrivateRoutes>
                <TennisReservationForm/>
            </PrivateRoutes>
          }/> 
          
        {/* <Route path="/MakeReservation/idCancha=:idCancha/idHorario=:idHorario/:ano-:mes-:dia" element={<TennisReservationForm/>}/> */}      

        <Route path="/ReservationDetails/idReserva=:idReserva/cancha=:idCancha" 
          element={
            <PrivateRoutes>
                <ReservationDetails/>
            </PrivateRoutes>
          }/>

        <Route path="/subtorneoMatches/idSubtorneo=:idSubtorneo" 
          element={
            <PrivateRoutes>
                <SubtorneoEnfrentamientos/>
            </PrivateRoutes>
          }/>

        <Route path="/torneoColores/:id" 
          element={
            <PrivateRoutes>
                <TorneoColores/>
            </PrivateRoutes>
          }/>

        <Route path="/torneoColores/:id/enfrentamientos" 
          element={
            <PrivateRoutes>
                <ColoresEnfrentamientosForUsers/>
            </PrivateRoutes>
          }/>

        <Route path="/Profile/:user_id/" 
          element={
            <PrivateRoutes>
                <UserProfile/>
            </PrivateRoutes>
          }/>

        <Route path="/resetPassword" 
          element={
                <ResetPassword/>
          }/>
        

        {/* <Route path="/ReservationDetails/idReserva=:idReserva/cancha=:idCancha" element={<ReservationDetails/>}/> */}      

        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
      
  </BrowserRouter>
  );
}

export default App;
