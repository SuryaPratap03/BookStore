import express from "express";
import User from "../models/user.js";
import jwt from "jsonwebtoken"
import authenticatetoken from "./userAuth.js";

const router = express.Router();

//put book to cart
router.put('/addToCart',authenticatetoken,async(req,res)=>{
    try{
        const {bookid,id} = req.headers;
        const userData = await User.findById(id);
        const isBookInCart =userData.cart.includes(bookid);
        if(isBookInCart){
            return res.json({
                status : 'success',
                message : 'Book is already in the Cart',
            });
        }
        await User.findByIdAndUpdate(id,{
            $push: {cart:bookid},
        })
        return res.json({
            status:'Success',
            message: 'Book added in cart'
        });
    }catch(error){
        return res.status(500).json({ message : 'An error occured'});
    }
})

//deleted book to cart
router.put('/removeFromCart/:bookid',authenticatetoken,async(req,res)=>{
    try{
        const {bookid} = req.params;
        const {id} = req.headers;
        await User.findByIdAndUpdate(id,{
            $pull : { cart: bookid },
        });
        return res.json({
            status : 'success',
            message : 'Book Removed From Cart',
        });
    }catch(error){
        return res.status(500).json({ message : 'An error occured'});
    }
})

//get cart of a particular user
router.get('/getUserCart',authenticatetoken,async(req,res)=>{
    try{
        const {id} = req.headers;
        const userData = await User.findById(id).populate('cart');
        const cart = userData.cart.reverse();

        return res.json({
            status :'Success',
            data: cart,
        })
    }catch(error){
        return res.status(500).json({ message: 'An error occured'});
    }
})
export default router;