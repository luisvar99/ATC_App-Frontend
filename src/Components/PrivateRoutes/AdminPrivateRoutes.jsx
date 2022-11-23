import { Navigate, Outlet } from "react-router-dom";
import React, {useContext } from 'react'
import { AccountContext } from "../Context/UserContext";

const PrivateRoutes = ({user, redirectTo = "/", children}) => {
    console.log("ROLE DESDE ADMIN PRIVATE ROUTES " + sessionStorage.getItem('userRole'));
    if(user==null){
        console.log("userRole " + user);
        return <Navigate to={redirectTo}/>
    }
    return children;
}

export default PrivateRoutes;