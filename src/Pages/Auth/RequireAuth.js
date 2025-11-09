import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Cookie from 'cookie-universal'
import { useEffect, useState } from "react";

import {  USER } from "../../Api/Api";
import LoadingSubmit from "../../Components/Loading/Loading";
import { Axios } from "../../Api/Axios";
import Error403 from "./403";
export default function RequireAuth({allowedRole}) {
    const Navigate= useNavigate(); 
    // user
    const [user, setUser] = useState("");
    useEffect(() => {
        Axios.get(`/${USER}`, {
           
        }).then((data) => setUser(data.data)).catch(()=>{
            Navigate('/login',{replace:true})
        });
    }, [])
    // cookie & token
    const cookie = Cookie();
    const token = cookie.get('e-commerce');
    //  : 
    return (
        token ? (user === "" ? (<LoadingSubmit />) : allowedRole.includes(user.role)? (<Outlet />) : <Error403/>) : (<Navigate to={'/login'} replace={true} />)
    );
}