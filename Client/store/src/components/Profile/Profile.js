import React, { useEffect, useState } from 'react';
import './Profile.css';
import axios from 'axios';

const Profile = () => {

    const token = localStorage.getItem("authToken");
    const [userData, setData] = useState(null);

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
        } catch (error) {
            console.error("Error getting the user", error);
        }
    }

    return (
        <div className='user-details-container'>
            <div className='details'>
                <h3>
                    Account details
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

                    </>) : ''}
            </div>

        </div>
    )
}


export default Profile

