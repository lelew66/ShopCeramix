import React, {useState, useMemo} from 'react'


import './OrdersTable.css';
import { IoMdArrowDropdown } from "react-icons/io";



const OrdersTable = ({data}) => {
  
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
                    <th onClick={() => requestSort('orderDate')}>Order Date<span><IoMdArrowDropdown /></span></th>
                    <th onClick={() => requestSort('orderNumber')}>Order Number</th>
                    <th onClick={() => requestSort('totalPrice')}>Total Price<span><IoMdArrowDropdown /></span></th>
                    <th onClick={() => requestSort('totalItems')}>Items<span><IoMdArrowDropdown /></span></th>
                    <th onClick={() => requestSort('status')}>Order Status</th>
                </tr>
            </thead>
            <tbody>
                {sortedData.map((item) => (
                    <tr key={item.id}>
                        <td>{item.orderDate}</td>
                        <td>{item.orderNumber}</td>
                        <td>${item.totalPrice}</td>
                        <td>{item.totalItems}</td>
                        <td>{item.status}</td>
                    </tr>
                ))}
            </tbody>
        </table>
  
    </div>
  )
}

export default OrdersTable
