import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./topBox.scss"

const TopBox = () => {
  const [topDealUsers, setTopDealUsers] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:5000/api/admin/orders', {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });

        const orders = response.data;

        const userTotals = orders.reduce((acc, order) => {
          if (!acc[order.customerEmail]) {
            acc[order.customerEmail] = { 
              username: order.customerName,
              email: order.customerEmail,
              amount: 0
            };
          }
          acc[order.customerEmail].amount += order.orderTotal;
          return acc;
        }, {});

        const topUsers = Object.values(userTotals)
          .sort((a, b) => b.amount - a.amount)
          .slice(0, 7);

        setTopDealUsers(topUsers);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="topBox">
      <h1>Top Users</h1>
      <div className="list">
        {topDealUsers.map((user, index) => (
          <div className="listItem" key={index}>
            <div className="user">
              <img src="/profilePic.svg" alt="" />
              <div className="userTexts">
                <span className="username">{user.username}</span>
                <span className="email">{user.email}</span>
              </div>
            </div>
            <span className="amount">${user.amount.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBox;
