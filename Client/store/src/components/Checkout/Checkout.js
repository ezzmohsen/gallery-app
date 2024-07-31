import React, { useContext, useEffect, useState } from 'react';
import './Checkout.css';
import { Link, useNavigate } from 'react-router-dom';
import CartContext from '../Cart/CartContext'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Checkout = ({ setCartCount }) => {
    const { cart, dispatch } = useContext(CartContext);
    const [userData, setData] = useState(null);

    const navigate = useNavigate()

    let orderItems = {
        orderItemsId: []
    };

    const token = localStorage.getItem("authToken");

    useEffect(() => {
        getUser()
    }, []);


    const getUser = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/users", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setData(response.data)
            console.log(response.data)
        } catch (error) {
            console.error("Error getting the user", error);
        }
    }
    const submit = async () => {
        const items = cart.map(product => ({
            id: product._id,
            quantity: product.quantity
        }));
        console.log(items)
        orderItems.orderItemsId = items;

        try {
            const response = await axios.post("http://localhost:5000/api/orders", orderItems, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            // response.data
            localStorage.removeItem('cart')
            setCartCount(0);
            dispatch({ type: 'CLEAR_CART' })
            toast.success("Order created successfully!", {
                position: 'top-right',
                autoClose: 1000,
                onClose: () => (setCartCount(0),
                    dispatch({ type: 'CLEAR_CART' }), navigate('/'))
            });
            console.log(response.data)

        } catch (error) {
            console.error("Error submitting the order:", error);
        }
    };


    const calculateCartTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };
    return (
        <div className="checkout">
            <div className='breadcramb'>
                <div className='container'>
                    <p className='title'>checkout</p>
                    <div className='breadcramb-container'>
                        <Link to="/">
                            <p>Home</p>
                        </Link>
                        <span>&gt;</span>
                        <p>Checkout</p>
                    </div>
                </div>
            </div>

            <div className="checkout-container">
                <div className='user-details'>
                    <h3>
                        BILLING & SHIPPING
                    </h3>
                    {userData ?
                        (<>
                            <div className='user-input'>
                                <label htmlFor='name'>Name </label>
                                <input id="name" value={userData.name}></input>
                            </div>
                            <div className='user-input'>
                                <label htmlFor='phone'>Phone </label>
                                <input name='phone' value={userData.phone}></input>
                            </div>
                            <div className='user-input'>
                                <label htmlFor='email'>Email </label>
                                <input id="email" value={userData.email}></input>
                            </div>
                            <div className='user-input'>
                                <label htmlFor='address'>Address </label>
                                <input id="address" value={userData.address}></input>
                            </div>
                            <div className='info'>
                                <h4 style={{ margin: '40px 0px 20px' }}> Additional information </h4>
                                <label htmlFor='notes'>Order notes (Optional)</label>
                                <textarea id="notes" placeholder="Notes about your order, e.g. special notes for delivery."></textarea>
                            </div>
                        </>) : ''}

                </div>
                <div className='order-details'>
                    <h3>
                        YOUR ORDER
                    </h3>
                    <div className='row'>
                        <p className='subtitle'>PRODUCT</p>
                        <p className='value'></p>
                    </div>

                    {cart.map((product) => (
                        <div className='row' key={product.id}>
                            <p className='subtitle'>{product.name} * {product.quantity}</p>
                            <p className='value'>  EGP {product.price * product.quantity}</p>
                        </div>
                    ))}

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
                    <h4 style={{ margin: '40px 0px 20px' }}>Payment method</h4>
                    <div className='options'>
                        <input type='radio' checked="checked" id="option1" name="options" readOnly></input>
                        <label htmlFor="option1">Cash on delivery</label>
                    </div>
                    <div className='options'>
                        <input type='radio' id="option2" name="options" readOnly></input>
                        <label htmlFor="option2">Visa / Mastercard</label>
                    </div>

                    {/* <div className='options'>
                        <label htmlFor="option2">Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.

                        </label>
                    </div> */}


                    <a className='button' onClick={() => submit()}>
                        PLACE ORDER
                        <ToastContainer />
                    </a>

                </div>
            </div>



        </div >
    );
};

export default Checkout;

