import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard/BookCard';
import Loader from '../components/Loader/Loader';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state
  const [total, setTotal] = useState(0);

  // Set up headers for the request
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // Fetch favorite books on component mount
  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true); // Start loading
      try {
        const response = await axios.get('http://localhost:1000/api/v1/getUserCart', {
          headers,
        });
        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching Cart books:', error);
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchCart();
  }, []);

  const navigate = useNavigate();
  const PlaceOrder=async()=>{
    try {
      const response = await axios.post(
        'http://localhost:1000/api/v1/placeOrder', 
        {order : data},
        {headers},
      );
      alert(response.data.message);
      navigate('/profile/orderHistory')
    } catch (error) {
      console.error('Error fetching Cart books:', error);
    } 

  }

  const onRemove = (bookid) => {
    setData(data.filter((book) => book._id !== bookid));
  };

  useEffect(() => {
    if (data && data.length > 0) {
      let total = 0;
      data.forEach((item) => {
        total += item.price; // Assuming each item has a price property
      });
      setTotal(total);
    } else {
      setTotal(0); // Reset total if no items
    }
  }, [data]);

  // Show loader while loading
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-black">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between items-center bg-zinc-900 text-white min-h-screen p-6">
      {/* Cart Title at the top and centered */}
      <h1 className="text-4xl font-semibold mb-6 text-center w-full">Cart</h1>

      <div className="flex-grow w-full max-w-5xl flex flex-col items-center">
        {/* Placeholder for cart items */}
        <div className="flex-grow w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {data && data.length > 0 ? (
            data.map((item) => (
              <BookCard data={item} key={item._id} Cart={true} onremove={onRemove} />
            ))
          ) : (
            <p className="text-lg text-gray-500 w-full text-center">
              You currently have nothing in your Cart.
            </p>
          )}
        </div>

        {/* Total Footer positioned to the right */}
        {data.length>0 &&  <div className="w-full flex justify-end">
          <div className="bg-green-500 text-lg text-white font-bold px-4 py-2 rounded-lg">
            Total: ₹{total.toFixed(2)}
          </div>
        </div>}

        {data.length>0 &&  <div className="w-full flex justify-end">
          <button onClick={PlaceOrder} className=" mt-4 bg-red-500 text-lg text-white font-bold px-4 py-2 rounded-lg">
            Place Your Order
          </button>
        </div>}
      </div>
    </div>
  );
};

export default Cart;
