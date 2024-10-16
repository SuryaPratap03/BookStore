import express from "express";
import User from "../models/user.js";
import jwt from "jsonwebtoken"
import authenticatetoken from "./userAuth.js";
import Book from "../models/book.js";

const router = express.Router();

//addBook - admin
router.post('/addBook',authenticatetoken,async(req,res)=>{
    try{
        const {id} = await req.headers;
        const user = await User.findById(id);
        if(user.role!=='admin'){
            return res.status(400).json({ message : `You are not Authorized to perform Admin's task` })
        }
        const {url,title,author,price,desc,language} = req.body;
        const book = new Book({url,title,author,price,desc,language});
        await book.save();
        return res.status(200).json({message: 'Book added Succesfully'});
    }catch(error){
        return res.status(500).json({ message : error.message});
    }
})

//update book
router.put('/updateBook',authenticatetoken,async(req,res)=>{
    try{
        const {url,title,author,price,desc,language} = req.body;
        const {bookid} = await req.headers;
        await Book.findByIdAndUpdate(bookid,{
            url,title,author,price,desc,language
        });
        return res.status(200).json({message: 'Book Updated Succesfully'});
    }catch(error){
        return res.status(500).json({ message : error.message});
    }
})

//delete book
router.delete('/deleteBook',async(req,res)=>{
    try{
        const {bookid} = req.headers;
        await Book.findByIdAndDelete(bookid);
        return res.status(200).json({message: 'Book Deleted Succesfully'});
    }catch(error){
        return res.status(500).json({ message : error.message});
    }
})

//get allBooks
router.get('/getAllBooks',async(req,res)=>{
    try{
        const books = await Book.find().sort({ createdAt : -1});
        return res.status(200).json({status: 'success',data:books});
    }catch(error){
        return res.status(500).json({ message : error.message});
    }
})


//get recent books
router.get('/getRecentBooks',async(req,res)=>{
    try{
        const books = await Book.find().sort({ createdAt : -1}).limit(4);
        return res.status(200).json({status: 'success',data:books});
    }catch(error){
        return res.status(500).json({ message : error.message});
    }
})


//getBookById
router.get('/getBookById/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const book = await Book.findById(id);
        return res.status(200).json({ status :'success',data:book});
    }catch(error){
        return res.status(500).json({ message : error.message});
    }
})

export default router;