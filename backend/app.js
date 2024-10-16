import express from "express";
import { configDotenv } from "dotenv";
import { conn } from "./conn/conn.js";
import router from "./routes/user.js";
import Cart from "./routes/cart.js";
import Books from "./routes/book.js";
import Favourite from "./routes/favourites.js";
import Order from "./routes/order.js";
import cors from 'cors';
configDotenv();
const app = express();

app.use(cors({

  origin:'http://localhost:5173'
}
));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use('/api/v1',router);
app.use('/api/v1',Books);
app.use('/api/v1',Favourite);
app.use('/api/v1',Cart);
app.use('/api/v1',Order);

//creating port
app.listen(process.env.Port, () => {
  console.log("Server Started at Port 1000");
});
