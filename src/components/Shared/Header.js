import React from 'react';
import { Link } from 'react-router-dom';
import './Shared.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CartContext } from '../../context/CartContext';
import { useContext } from 'react';
const Header = () => {
    const { cartItems } = useContext(CartContext)
    return <header>
        <nav>
            <ul className='nav-list'>
                <li><Link className='nav-item' to='/products' >Products</Link></li>
                <li><Link className='nav-item' to='/orders' >Order History</Link></li>
                <li><Link className='nav-item' to='/dashboard' >Dashboard</Link></li>
            </ul>
            <Link to='/cart' className='cart'><FontAwesomeIcon icon="fa-solid fa-cart-shopping" />{cartItems.length ? <span className='cart-count'>{cartItems.length}</span> : ''}</Link>
        </nav>
    </header>;
};

export default Header;
