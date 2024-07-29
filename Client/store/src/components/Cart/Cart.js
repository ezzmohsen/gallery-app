import React, { useContext } from 'react';
import CartContext from './CartContext';
import './Cart.css';
import { IoClose } from "react-icons/io5";
import { Link } from 'react-router-dom';


const Cart = () => {
    const { cart, dispatch } = useContext(CartContext);
    console.log(cart)
    const removeFromCart = (id) => {
        console.log(id)
        dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    };

    const updateQuantity = (id, quantity) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    };

    const calculateTotal = (price, quantity) => {
        return (price * quantity).toFixed(2);
    };

    const calculateCartTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };
    return (
        <div className="cart">
            <div className='breadcramb'>
                <div className='container'>
                    <p className='title'>Cart</p>
                    <div className='breadcramb-container'>
                        <Link to="/">
                            <p>Home</p>
                        </Link>
                        <span>&gt;</span>
                        <p>Cart</p>
                    </div>
                </div>
            </div>

            <div className="cart-container">
                {cart.length === 0 ? (
                    <div className='empty-cart-container'>
                        <div className='empty-cart'>

                            <p className="empty-cart-message">Your cart is empty</p>
                        </div>

                        <div className='return-to-shop'>
                            <Link to="/" className='button'>
                                Return to shop
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className='table-container'>
                        <table className="cart-table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th></th>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map(item => (
                                    <tr key={item._id}>
                                        <td>
                                            <IoClose onClick={() => removeFromCart(item._id)} className="remove-item" />

                                        </td>
                                        <td><img src={item.image} alt={item.name} className="product-image" /></td>
                                        <td>{item.name}</td>
                                        <td>EGP {item.price.toFixed(2)}</td>
                                        <td>
                                            <input
                                                type="number"
                                                value={item.quantity}
                                                onChange={(e) => updateQuantity(item._id, e.target.value)}
                                                min="1"
                                                className="quantity-input"
                                            />
                                        </td>
                                        <td>EGP {calculateTotal(item.price, item.quantity)}</td>

                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan="4" className="total-label">Cart Total</td>
                                    <td colSpan="2" className="cart-total">EGP {calculateCartTotal()}</td>
                                </tr>
                            </tbody>
                        </table>




                        <div className='cart-footer'>
                            <div className='coupon'>
                                <h2>
                                    Coupon
                                </h2>
                                <div className='copoun-input'>
                                    <label>Enter your coupon code if you have one. </label>
                                    <input placeholder='Coupon Code'></input>
                                </div>

                                <a className='button' >
                                    Apply coupon
                                </a>
                            </div>
                            <div className='cart-totals'>
                                <h2>
                                    Cart totals
                                </h2>
                                <div className='row'>
                                    <p className='subtitle'>SUBTOTAL</p>
                                    <p className='value'>EGP {(parseFloat(calculateCartTotal())).toFixed(2)}</p>
                                </div>
                                <div className='row'>
                                    <p className='subtitle'>SHIPPING</p>
                                    <p className='value'>EGP 40</p>
                                </div>
                                <div className='row'>
                                    <p className='subtitle'>TOTAL</p>
                                    <p className='value'>EGP {(parseFloat(calculateCartTotal()) + 40).toFixed(2)}</p>
                                </div>
                                <Link to="/checkout" className='button'>
                                    Proceed to checkout
                                </Link>

                            </div>
                        </div>

                    </div>


                )}
            </div>



        </div>
    );
};

export default Cart;

