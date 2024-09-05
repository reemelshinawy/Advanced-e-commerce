import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Cart.css'
import { useNavigate } from 'react-router-dom';
const Cart = () => {
    const { cartItems, removeItem, getTotal } = useContext(CartContext);
    const navigate = useNavigate()
    const handleCheckout = () => {
        if (!cartItems.length) {
            return
        }
        navigate('/checkout', { state: cartItems })
    }
    return (
        <div className='main-sec'>
            <h2 className='page-title'>Shopping Cart</h2>
            <ul className='cart-prods'>
                {cartItems.map(item => (
                    <li key={item.id} className='prod-cart'>
                        <p>{item.name}</p>
                        <img src={item.image} alt='product' />
                        <p><span>{item.quantity}</span> x <span>${item.price.toFixed(2)}</span></p>
                        <button onClick={() => removeItem(item.id)}><FontAwesomeIcon icon="fa-solid fa-trash" /></button>
                    </li>
                ))}
            </ul>
            <h3 className='total'>Total: ${getTotal().toFixed(2)}</h3>
            <button className='checkout-btn' onClick={handleCheckout}>Checkout<FontAwesomeIcon icon="fa-solid fa-arrow-right" /></button>
        </div>
    );
};

export default Cart;
