import React, { useEffect, useState } from 'react'
import {useNavigate, Link} from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import {useLogout} from '../hooks/useLogout';
import {getHours} from 'date-fns';
import Navbar from '../components/Navbar';
import Promo from '../components/Promo/Promo';
import Footer from '../components/Footer/Footer';
import Userboard from '../components/AdminDashboard/Userboard/Userboard';
import Productboard from '../components/AdminDashboard/Productboard/Prodcutboard';
import Orderboard from '../components/AdminDashboard/Orderboard/Orderboard';
import Reviewboard from '../components/AdminDashboard/Reviewboard/ReviewDashboard'
export default function Admin() {
   
    const {user} = useAuthContext();
    const[timeOfDay, setTimeOfDay] = useState('');
    const[users, setUsers] = useState([]);
    const[products, setProducts] = useState([]);
    const[orders,setOrders] =useState([]);
    const [activeView, setActiveView] = useState('');

    const navigate = useNavigate();
    const {logout} = useLogout();

    
    const fetchUsers = async () =>{
      try{
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/account`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await response.json();
        // console.log(data);
        setUsers(data);
      }catch(err){
        console.log(err);
      }
    }

    const fetchProducts = async () =>{
      try{
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/products`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await response.json();
        setProducts(data);
      }catch(err){
        console.log(err);
      }
    }

    const fetchOrders = async () =>{
      try{
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/orders`,{
          method: 'GET',
          headers:{
            'Conten-Type': "application/json",
            Authorization: `Bearer ${user.token}`,
          }
        });
        const data = await (response.json());
        console.log(data);
        setOrders(data);

      }catch(err){
        console.log(err);
      }
    }

    
    useEffect(()=>{
        const currentTime = new Date();
        const currentHour = getHours(currentTime);
  
          if (currentHour >= 5 && currentHour < 12) {
              setTimeOfDay('Morning');
          } else if (currentHour >= 12 && currentHour < 17) {
              setTimeOfDay('Afternoon');
          } else if (currentHour >= 17 && currentHour < 21) {
              setTimeOfDay('Evening');
          } else {
              setTimeOfDay('Night');
          }
  
          if(!user){
            navigate('/login');
          }

          fetchUsers();
          fetchProducts();
          fetchOrders();
      }, [user,navigate])

    const handleLogout =  () => {
        logout();
    }
   
    const handleViewChange = (viewName) => {
      setActiveView(viewName);
  }
  
 

  return (
    <div className='page-container admin-page'>
    <Promo/>
    <Navbar/>
    {user && 
      <div className='page-content'>
         <h3>Good {timeOfDay}, {(user.username || user.email.substring(0, user.email.indexOf('@'))).toUpperCase()}!</h3>
        
         <section className="admin-dashboard">
                    <div className="task-panel">
                        <ul>
                            <li onClick={() => handleViewChange('users')}>Users</li>
                            <li onClick={() => handleViewChange('products')}>Products</li>
                            <li onClick={() => handleViewChange('orders')}>Orders</li>
                            <li onClick={() => handleViewChange('reviews')}>Reviews</li>
                        </ul>
                    </div>

                    {activeView === 'users' && <Userboard data={users}/>}
                    {activeView === 'products' && <Productboard data={products}/>}
                    {activeView === 'orders' && <Orderboard data={orders}/>}
                    {activeView === 'reviews' && <Reviewboard />}

               

                </section>

         <button className='btn' onClick={handleLogout}>Logout</button>
      </div>  
      
    }
    <Footer/>
  </div> 
  )
}

