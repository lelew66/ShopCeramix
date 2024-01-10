import React, {useState, useMemo} from 'react'


import './ShoppingCartboard.css';
import { IoMdArrowDropdown } from "react-icons/io";



// const ShoppingCartboard = ({data}) => {
  
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

//     const sortedData = useMemo(() => {
//         let sortableItems = [...data];
//         if (sortConfig !== null) {
//             sortableItems.sort((a, b) => {
//                 if (a[sortConfig.key] < b[sortConfig.key]) {
//                     return sortConfig.direction === 'ascending' ? -1 : 1;
//                 }
//                 if (a[sortConfig.key] > b[sortConfig.key]) {
//                     return sortConfig.direction === 'ascending' ? 1 : -1;
//                 }
//                 return 0;
//             });
//         }
//         return sortableItems;
//     }, [data, sortConfig]);

//     const requestSort = (key) => {
//         let direction = 'ascending';
//         if (sortConfig.key === key && sortConfig.direction === 'ascending') {
//             direction = 'descending';
//         }
//         setSortConfig({ key, direction });
//     };
  
//   return (
//     <div className="orders-container">
//         <table>
//             <thead>
//                 <tr>
//                     <th onClick={() => requestSort('orderDate')}>User ID<span><IoMdArrowDropdown /></span></th>
//                     <th onClick={() => requestSort('orderNumber')}>Username</th>
//                     <th onClick={() => requestSort('totalPrice')}>email<span><IoMdArrowDropdown /></span></th>
//                     <th onClick={() => requestSort('totalItems')}>Cart Items<span><IoMdArrowDropdown /></span></th>
//                     <th onClick={() => requestSort('status')}>Created At</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {sortedData.map((user) => (
//                     <tr key={user._id}>
//                         <td>{user._id}</td>
//                         <td>{user.username}</td>
//                         <td>{user.email}</td>
//                         <td>{user.shoppingCart.length}</td>
//                         <td>{user.createdAt}</td>
                        
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
  
//     </div>
//   )
// }

// export default ShoppingCartboard
