import React, { createContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return [...state, action.payload];
        case 'REMOVE_FROM_CART':
            return state.filter(product => product._id !== action.payload);
        case 'UPDATE_QUANTITY':
            return state.map(product =>
                product._id === action.payload.id
                    ? { ...product, quantity: action.payload.quantity }
                    : product
            );
        case 'INITIALIZE_CART':
            return action.payload;
        case 'CLEAR_CART':
            return []
        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, []);

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            dispatch({ type: 'INITIALIZE_CART', payload: JSON.parse(savedCart) });
        }
    }, []);

    useEffect(() => {
        if (cart.length > 0) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, [cart]);

    return (
        <CartContext.Provider value={{ cart, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
