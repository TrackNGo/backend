const express= require('express');
const app=express();
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT;


app.use(cors());
app.use(express.json());

app.listen(port,()=>{
    console.log(`Server is up on port ${port}`);
});

