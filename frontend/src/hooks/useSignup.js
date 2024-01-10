import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useSignup =() =>{
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [success, setSuccess] = useState(null);
    const {dispatch} = useAuthContext();
    const navigate = useNavigate();

    const signup = async (username ,email, password) =>{
       setIsLoading(true);
       setError(null);

       const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/account/signup`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username,email,password})
       })

       const json = await response.json();

       if(!response.ok){
        setIsLoading(false);
        setError(json.error);
       }
       if(response.ok){
        //save the user to local storage
        localStorage.setItem('user', JSON.stringify(json));
        dispatch({type: 'LOGIN', payload: json})
        
        setIsLoading(false);
        //display a message let the user know signup successfully before redirect to login page
        setSuccess('Signup successful, please login.')

        setTimeout(()=>{
            navigate('/login')
        },1800)
        
       }
    }

    return {signup, isLoading, error, success}
}