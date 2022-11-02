import { Navigate, Outlet } from "react-router-dom";
import React, {useContext } from 'react'
import { AccountContext } from "../Context/UserContext";

const useAuth = () => {
    /* const user = useContext(AccountContext) */
    /* return user && user.loggedIn */
}

const PrivateRoutes = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet/> : <Navigate to="/" />
}

export default PrivateRoutes;