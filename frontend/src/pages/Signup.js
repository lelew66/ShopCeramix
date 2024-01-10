import {useState} from 'react';
import {Link} from 'react-router-dom';

import { useSignup } from '../hooks/useSignup';

const Signup = () => {
   const [username, setUsername] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const {signup, isLoading, error, success} = useSignup();

   const handleSubmit = async (e) =>{
    e.preventDefault();
    await signup(username, email, password);
   }

   return (
    <div className="signup-page">
     <div className="form-background">
      <div className="page-title">
          <Link to="/"><h2 className='page-title-logo'>CERAMIX</h2></Link>
          <h4 className='page-subtitle'>Welcome to our fine ceramics</h4>
          <h4 className='page-subtitle' style={{color:'#e7395a'}}>{success}</h4>
        </div>
     

        <form className='login-form' onSubmit={handleSubmit}>

          <label > Username</label>
          <input 
          type="text" 
          onChange={(e)=>{setUsername(e.target.value)}}
          value={username}
          />

         <label > Email</label>
          <input 
          type="email" 
          onChange={(e)=>{setEmail(e.target.value)}}
          value={email}
          />

          <label>Password</label>
          <input 
            type="password" 
            onChange={(e)=>{setPassword(e.target.value)}}
            value={password}
          />
        
          <br />

          <button  className="btn" disabled={isLoading}>Sign up</button>
          
          {error && <div className='error'>{error}</div>}

        </form>
        <div className='login-footer'>
          <div>Have an account? <Link to="/login"> <span style={{marginLeft:'10px', color:'var(--light-blue)'}}>Sign in</span></Link></div>
        </div>
       
     </div>
      
    </div>
   
   )
}

export default Signup;