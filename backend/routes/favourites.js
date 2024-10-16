import express from "express";
import User from "../models/user.js";
import authenticatetoken from "./userAuth.js";

const router = express.Router();

//add Book to Favourite
router.put('/addBookToFavourite',authenticatetoken,async(req,res)=>{
    try{
        const {bookid,id} = req.headers;
        const userData = await User.findById(id);
        const isBookFavourite = userData.favourites.includes(bookid);
        if(isBookFavourite){
            return res.status(200).json({message: 'Book is Already in favourites'});
        }
        await User.findByIdAndUpdate(id,{$push:{favourites:bookid}})
        return res.status(200).json({message : 'Book added in Favourites'})
    }catch(error){
        return res.status().json({ message: error.message});
    }
})

//get Favourite books of a particular user
router.put('/removeBookFromFavourite',authenticatetoken,async(req,res)=>{
    try{
        const {bookid,id} = req.headers;
        const userData = await User.findById(id);
        const isBookFavourite = userData.favourites.includes(bookid);
        if(isBookFavourite){
            await User.findByIdAndUpdate(id,{$pull:{favourites:bookid}})        
        }
        return res.status(200).json({message : 'Book removed from Favourites'})
    }catch(error){
        return res.status().json({ message: error.message});
    }
})

// get Favourites book of a particular User
router.get('/getFavouriteBooks',authenticatetoken,async(req,res)=>{
    try{
        const { id } = req.headers;
        const userData = await User.findById(id).populate('favourites');
        const favouriteBooks = userData.favourites;
        return res.json({
            status:'Success',
            data:favouriteBooks,
        });
    }catch(error){
        return res.status(200).json({ status: error.message});
    }
})
export default router;