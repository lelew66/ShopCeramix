import React, {useState, useMemo} from 'react'


import './Orderboard.css';
import { IoMdArrowDropdown } from "react-icons/io";


const Orderboard = ({data}) => {
  
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    const sortedData = useMemo(() => {
        let sortableItems = [...data];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [data, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };
  
  return (
    <div className="orders-container">
        <table>
            <thead>
                <tr>
                    <th onClick={() => requestSort('orderDate')}>Order ID<span><IoMdArrowDropdown /></span></th>
                    <th onClick={() => requestSort('orderNumber')}>Total</th>
                    <th onClick={() => requestSort('totalPrice')}>Order Time<span><IoMdArrowDropdown /></span></th>
                    <th onClick={() => requestSort('totalItems')}>Status<span><IoMdArrowDropdown /></span></th>
                    <th onClick={() => requestSort('status')}>Customer ID</th>
                </tr>
            </thead>
            <tbody>
                {sortedData.map((order) => (
                    <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.total}</td>
                        <td>{order.createdAt}</td>
                        <td>{order.status}</td>
                        <td>{order.user}</td>
                        
                    </tr>
                ))}
            </tbody>
        </table>
  
    </div>
  )
}

export default Orderboard
