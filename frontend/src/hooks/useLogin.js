import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useLogin =() =>{
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const {dispatch} = useAuthContext();
    const navigate = useNavigate();

    const login = async (identifier, password, name,type) =>{
       setIsLoading(true);
       setError(null);

       const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/account/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({identifier,password,name,type})

       })

       const json = await response.json();

       if(!response.ok){
        setIsLoading(false);
        setError(json.error);
       }
       if(response.ok){
        //save the user to local storage
        // console.log("====> useLogin, json:",json);
        localStorage.setItem('user', JSON.stringify(json));
        dispatch({type: 'LOGIN', payload: json})
        
        setIsLoading(false);
        navigate('/');
       }
    }

    return {login,  isLoading, error} 

}