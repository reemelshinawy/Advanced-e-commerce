import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addItem = (item) => {
        const itemExists = cartItems.find(cartItem => cartItem.id === item.id);

        if (itemExists) {
            // Increase the quantity of the existing item
            setCartItems(
                cartItems.map(cartItem =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                )
            );
        } else {
            // Add new item to cart with a quantity of 1
            setCartItems([...cartItems, { ...item, quantity: 1 }]);
        }
    };
    const clearCart = () => {
        setCartItems([])
    }
    const removeItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const getTotal = () => {
        return cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
    };

    return (
        <CartContext.Provider value={{ cartItems, addItem, removeItem, getTotal, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
