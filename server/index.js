import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import userFieldRoutes from './controllers/userFieldController.js';


const app = express();



app.use(express.urlencoded({extended: true})); 
app.use(express.json());   

app.use(cors());

//Database password
//user : public
//password : public123

const CONNECTION_URL = "mongodb+srv://public:public123@mern-practice-cluster.3qk4w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>app.listen(PORT,()=>console.log(`successfully connected to mongoDB, port : ${PORT}`)))
.catch((err)=>console.log(err.message));

mongoose.set('useFindAndModify',false);

app.use('/userFields',userFieldRoutes);