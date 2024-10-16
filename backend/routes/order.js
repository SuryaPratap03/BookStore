import User from "../models/user.js";
import authenticatetoken from "./userAuth.js";
import Book from "../models/book.js";
import Order from "../models/order.js"; 
import express from "express";

const router = express.Router();

// Place an order
router.post('/placeOrder', authenticatetoken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { order } = req.body; 

        if (!Array.isArray(order) || order.length === 0) {
            return res.status(400).json({ message: "Invalid order data." });
        }

        for (const orderData of order) {
            const newOrder = new Order({ user: id, book: orderData._id });

            const orderDataFromDb = await newOrder.save();

            await User.findByIdAndUpdate(id, {
                $push: { orders: orderDataFromDb._id },
            });

            await User.findByIdAndUpdate(id, {
                $pull: { cart: orderData._id },
            });
        }
        
        return res.json({
            status: "Success",
            message: "Order Placed Successfully",
        });
    } catch (error) {
        console.error("Error placing order:", error);
        return res.status(400).json({ message: "Error placing order" });
    }
});

// Get order history of a particular user
router.get('/getOrderHistory', authenticatetoken, async (req, res) => { 
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate({
            path: "orders",
            populate: { path: "book" }, // Corrected to 'book'
        });

        const ordersData = userData.Order.reverse();
        return res.json({
            status: "Success",
            data: ordersData,
        });
    } catch (error) {
        console.error("Error fetching order history:", error);
        return res.status(500).json({ message: "Error fetching order history" });
    }
});

// Get all orders (admin access)
router.get('/getAllOrders', authenticatetoken, async (req, res) => {
    try {
        const ordersData = await Order.find()
            .populate({ path: "book" }) // Corrected to 'book'
            .populate({ path: "user" }) // Corrected to 'user'
            .sort({ createdAt: -1 });

        return res.json({
            status: "Success",
            data: ordersData,
        });
    } catch (error) {
        console.error("Error fetching all orders:", error);
        return res.status(500).json({ message: "Error fetching orders" });
    }
});

// Update order status (admin access)
router.put('/updateStatus/:id', authenticatetoken, async (req, res) => {
    try {
        const { id } = req.params;
        await Order.findByIdAndUpdate(id, { Status: req.body.status }); // Changed 'status' to 'Status'
        return res.json({
            status: "Success",
            message: "Status Updated Successfully",
        });
    } catch (error) {
        console.error("Error updating order status:", error);
        return res.status(500).json({ message: "Error updating status" });
    }
});

export default router;
