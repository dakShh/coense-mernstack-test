import React,{useState}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {  Button } from '@material-ui/core';
import axios from 'axios';
import { useHistory} from 'react-router-dom';
import '../css/adduserStyles.css'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
   },
    
  },
  
}));

export default function AddUser() {
  const classes = useStyles();
  let history = useHistory();



  const [user,setUser] = useState({
      name:'',
      email:'',
      phone:'',
      city:'',
      State:'',
      Country:'',
      Area:'',
  })

  const addUserData = async ()=>{
      try {
          await axios.post('http://localhost:5000/userFields',user).then(()=>{});
          history.push("/");
      } catch (error) {
        console.log(error.message);    
      }
  }
  const handleSubmit =(e)=>{
      e.preventDefault();
  }

  return (
    
    <div className="box">

        <h1>Add a user</h1>
        <form className={classes.root} noValidate onSubmit={handleSubmit} autoComplete="off">
            

            
            <TextField required id="outlined-basic" label="Full Name" variant="outlined" value={user.name} onChange={(event)=>{
                setUser({...user , name:event.target.value})
            }} />
            <TextField required id="outlined-basic" label="Email" variant="outlined" value={user.email} onChange={(event)=>{
                setUser({...user , email:event.target.value})
            }} />
            <TextField required id="outlined-basic" label="Phone Number" variant="outlined" value={user.phone} onChange={(event)=>{
                setUser({...user , phone:event.target.value})
            }} />
            <TextField required id="outlined-basic" label="City" variant="outlined" value={user.city} onChange={(event)=>{
                setUser({...user , city:event.target.value})
            }} />
            <TextField required id="outlined-basic" label="State" variant="outlined" value={user.State} onChange={(event)=>{
                setUser({...user , State:event.target.value})
            }} />
            <TextField required id="outlined-basic" label="Country" variant="outlined" value={user.Country} onChange={(event)=>{
                setUser({...user , Country:event.target.value})
            }}/>
            <TextField required id="outlined-basic" label="area" variant="outlined" value={user.Area} onChange={(event)=>{
                setUser({...user , Area:event.target.value})
            }} />
            <Button  variant="contained" color="primary" onClick={addUserData}  > Create </Button>
            
            
        </form>
    
    </div>
  );
}
