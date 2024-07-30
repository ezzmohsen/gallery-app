import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './WishlistPage.modules.css';

const WishlistPage = ({ wishlistItems, onAddToCart, onRemoveFromWishlist }) => {
    return (
        <div className="wishlist-page">
            <h2>My Wishlist</h2>
            <table className="wishlist-table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Product Name</th>
                        <th>Unit Price</th>
                        <th>Stock Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {wishlistItems.map((item) => (
                        <tr key={item.id}>
                            <td>
                                <img src={item.image} alt={item.name} className="wishlist-image" />
                            </td>
                            <td>{item.name}</td>
                            <td>EGP {item.price}</td>
                            <td>{item.stockStatus}</td>
                            <td>
                                <button onClick={() => onAddToCart(item)} className="add">
                                    <FontAwesomeIcon icon={faCartPlus} />
                                </button>
                                <button onClick={() => onRemoveFromWishlist(item)} className="remove">
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default WishlistPage;


