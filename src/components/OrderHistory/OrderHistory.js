import React, { useEffect, useState } from 'react';
import { fetchOrderHistory } from '../../utils/api';
import './OrderHistory.css'

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrders = async () => {
            const data = await fetchOrderHistory();
            setOrders(data);
        };
        getOrders();
    }, []);
    const getTotal = (arr) => {
        return arr.reduce((total, item) => total + item.quantity * item.price, 0);
    };
    return (
        <div className='main-sec'>
            <h2 className='page-title'>Order History</h2>
            <ul className='orders-records'>
                {orders.map(order => (
                    <li key={order.id}>
                        <div className='order-record'>
                            <h1>Order #{order.id}</h1>
                            <p>Name: {order.userData.name}</p>
                            <p>Phone: {order.userData.phone}</p>
                            <p>Shipping to: {order.userData.address}-{order.userData.city}</p>
                            <p className='date'>Submited on: {order.date}</p>
                            <div className='record-details'>
                                <h3>Order details</h3>
                                <ul className='orders'>
                                    {order.orderDetails.map((item) => (
                                        <li key={item.id}>
                                            <img src={item.image} alt='product' width={100} height={100} />
                                            <div>
                                                <p>{item.name}</p>
                                                <p>Quantity: {item.quantity}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <p className='total'>Total: ${getTotal(order.orderDetails).toFixed(2)}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderHistory;
