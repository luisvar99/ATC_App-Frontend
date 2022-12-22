import { Navigate, Outlet } from "react-router-dom";
import React, {useContext } from 'react'
import { AccountContext } from "../Context/UserContext";

const PrivateRoutes = ({user, redirectTo = "/", notAdmin = "/" ,children}) => {
    user = sessionStorage.getItem('userRole');
    //console.log("ROLE DESDE ADMIN PRIVATE ROUTES " + sessionStorage.getItem('userRole'));
    if(user==="null" || user===null){
        //console.log("userRole " + user);
        return <Navigate to={redirectTo}/>
    }else if(user !== "ADMIN"){
        return <Navigate to={notAdmin}/>
    }
    return children;
}

export default PrivateRoutes;