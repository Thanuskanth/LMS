const express=require('express');
const mongoose =require('mongoose');
const cors=require('cors');
require('dotenv').config();
const app=express();
const port=process.env.port || 5000;
const uri =process.env.ATLAS_URI;
app.use(express.json());
app.use(cors());

const roleRouter=require('./Routes/api/role');
app.use('/role',roleRouter);
const userrouter=require('./Routes/api/user');
app.use('/user',userrouter  );
const leaverouter=require('./Routes/api/leave');
app.use('/leave',leaverouter  );
const authrouter=require('./Routes/api/auth');
app.use('/',authrouter  );


mongoose.connect(uri,{useNewUrlParser:true, useUnifiedTopology: true}).then(console.log("database connected "))

app.listen(port,()=>console.log(`server connect port ${port}`))