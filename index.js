const express = require('express');
const app = express();
const Mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotEnv = require('dotenv');
const PORT = process.env.PORT || 3000;
const studentRoutes = require('./routes/studentRoutes');
const adminRoutes = require('./routes/adminRoutes');

dotEnv.config();
app.use(bodyParser.json());

Mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MongoDB Connected Successfully");
})
.catch((error)=>{
    console.log(`${error}`);
})


app.use('/student',studentRoutes);
app.use('/admin',adminRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`);
})