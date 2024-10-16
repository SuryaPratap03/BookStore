import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loader from '../Loader/Loader';
const UserHistoryOfOrders = () => {
  const [orderHistory,setOrderHistory] = useState()
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get('http://localhost:1000/api/v1/getOrderHistory', {
          headers
        });
        console.log(response);
      } catch (error) {
        console.log('Error fetching Order History Books:', error);
      }
    };
    fetch();
  }, []);
  return (
    <div>

    </div>
  )
}

export default UserHistoryOfOrders