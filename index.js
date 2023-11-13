if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }

const express=require('express');
const app=express();
const PORT=process.env.PORT||8000;
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/masterstack";
const mongoose=require('mongoose');
const cors=require('cors')

const profileRoutes=require('./router/profileRoutes')

mongoose.set('strictQuery', false);
mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("MONGOOSE CONNECTION OPEN");
  })
  .catch((err) => {
    console.log("IN MONGOOSE SOMETHING WENT WRONG", err);
  });

app.use(express.json());
app.use(
  cors({
    origin: "*", // client origin
  })
);

app.use('/',profileRoutes)

app.listen(PORT,()=>console.log(`listening on port ${PORT}`));