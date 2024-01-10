import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useLogin } from '../hooks/useLogin';

// import google from '../assets/google.png';
import GoogleLogin from '../components/GoogleLogin';
import { GoogleOAuthProvider } from '@react-oauth/google';

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(identifier, password);
  }

  const googleUserData = async (user) => {
    console.log('google user data');
    console.log(user);
    await login(user.email, user.id, user.name, 'googleuser');
  }
  
  return (
    <div className="login-page">
      <div className="form-background">
        <div className="page-title">
          <Link to="/"><h2 className='page-title-logo'>CERAMIX</h2></Link>
          <h4 className='page-subtitle'>Welcome to our fine ceramics</h4>
        </div>


        <form className='login-form' onSubmit={handleSubmit}>



          <label>Username or Email</label>
          <input
            type="text"
            onChange={(e) => { setIdentifier(e.target.value) }}
            value={identifier}
          />


          <label>Password</label>
          <input
            type="password"
            onChange={(e) => { setPassword(e.target.value) }}
            value={password}
          />

          <label style={{ textAlign: 'end', color: 'var(--light-blue)' }}>Forgot password?</label>

          <button className="btn" disabled={isLoading}>Sign in</button>

          {error && <div className='error'>{error}</div>}

        </form>
        <div className='login-footer'>
          <div className='option-line'>
            <div className="line"></div>
            <p>or</p>
            <div className="line"></div>

          </div>
          {/* <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}><img style={{ width:'20px', marginRight:'5px'}} src={google} alt="google" /><Link>Sign in with Google</Link></div> */}

          <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
            <GoogleLogin googleUserData={googleUserData}/>
          </GoogleOAuthProvider>
          <div>Don't have an account? <Link to="/signup"> <span style={{ marginLeft: '10px', fontSize:'0.75rem', color: 'var(--light-blue)' }}>Create Account</span></Link></div>
        </div>

      </div>

    </div>


  )
}

export default Login;