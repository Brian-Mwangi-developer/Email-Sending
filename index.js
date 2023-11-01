 const express = require("express");
 const cors = require("cors");
 require('dotenv').config();
 const bodyParser = require('body-parser');
 const formidableMiddleware = require('express-formidable');


 const detailsRouter = require("./routes/DetailsRoute");
 const emailRouter = require("./routes/sendemailRoute");


 const app = express();
 app.use(cors());
 app.use(express.json());
 app.use(express.urlencoded({ extended:true}));
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded());
 app.use(formidableMiddleware());

const PORT =7000;

app.get("/",async(req,res)=>{
    console.log("Welcome to the app")
})

app.use("/api/", detailsRouter);
app.use("/api",emailRouter)

app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`);
})
