import { Navigate, Outlet } from "react-router-dom";
import React, {useContext } from 'react'
import { AccountContext } from "../Context/UserContext";

const PrivateRoutes = ({user, redirectTo = "/", children}) => {
    console.log("USER ID DESDE PRIVATE ROUTES" + sessionStorage.getItem('userId'));
    user = sessionStorage.getItem('userId');
    if(user==null){
        return <Navigate to={redirectTo}/>
    }
    return children;
}

export default PrivateRoutes;