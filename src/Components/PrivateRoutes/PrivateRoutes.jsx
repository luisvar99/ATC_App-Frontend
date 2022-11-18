import { Navigate, Outlet } from "react-router-dom";
import React, {useContext } from 'react'
import { AccountContext } from "../Context/UserContext";

const PrivateRoutes = ({user_id, redirectTo = "/", children}) => {
    console.log("USER ID DESDE PRIVATE ROUTES" + sessionStorage.getItem('userId'));
    if(user_id===null){
        return <Navigate to={redirectTo}/>
    }
    return children
}

export default PrivateRoutes;