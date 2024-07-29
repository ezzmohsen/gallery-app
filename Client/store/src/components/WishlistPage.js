import React from 'react';
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
                                <button onClick={() => onAddToCart(item)} className='add'>Add to Cart</button>
                                <button onClick={() => onRemoveFromWishlist(item)} className='remove'>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default WishlistPage;

