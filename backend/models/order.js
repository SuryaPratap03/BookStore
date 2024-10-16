import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    book: {
        type: mongoose.Types.ObjectId,
        ref: 'Book'
    },
    Status: {
        type: String,
        default: 'Order Placed',
        enum: ['Order Placed', 'Out For Delivery', 'Delivered', 'Canceled']
    }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;
