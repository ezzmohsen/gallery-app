import React from 'react';
import './orderItemsView.scss'; // Import the SCSS file for styling

const OrderItemsView = ({ slug, orderitems, setOpen }) => {
  return (
    <div className="order-items-view">
      <div className="modal">
        <span className="close" onClick={() => setOpen(false)}>
          X
        </span>
        <h1>{`Order Items for ${slug}`}</h1>
        <div className="items-container">
          {orderitems.length > 0 ? (
            orderitems.map((item, index) => (
              <div key={index} className="order-item">
                <div className="item-details">
                  <div><strong>Product ID:</strong> {item.productId}</div>
                  <div><strong>Name:</strong> {item.productName}</div>
                  <div><strong>Price:</strong> ${item.productPrice.toFixed(2)}</div>
                  <div><strong>Quantity:</strong> {item.productQuantity}</div>
                  <div><strong>Subtotal:</strong> ${item.productSubtotal.toFixed(2)}</div>
                </div>
                {index < orderitems.length - 1 && <hr />} {/* Add separator between items */}
              </div>
            ))
          ) : (
            <p>No order items found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderItemsView;
