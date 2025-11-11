import axios from "axios";
import { useEffect } from "react";
import { baseUrl, GOOGLE_CALL_BACK } from "../../../Api/Api";
import { useLocation } from "react-router-dom";
import Cookie from "cookie-universal";

export default function GoogleCallBack() {
    const location =useLocation();
    const cookie =  Cookie();
   useEffect(() => {
      async function handleGoogleCallback() {
        try{
            const res =await axios.get(`${baseUrl}/${GOOGLE_CALL_BACK}${location.search}`);
            console.log(res);
            const token = res.data.access_token;
            cookie.set("e-commerce", token);
           
        }catch(err){
            console.log(err);
        }
        }
        handleGoogleCallback();
  }, []);



  return <h1>GoogleCallBack</h1>;
}