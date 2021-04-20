import React,{useEffect, useState}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container, Button } from '@material-ui/core';
import axios from 'axios';
import { useHistory, useLocation} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    
  },
  box:{
    

  },
}));

export default function AddUser() {
  const classes = useStyles();
  let history = useHistory();
  const location = useLocation();



  const [user,setUser] = useState({})

  const id = location.Objectid;
  useEffect(()=>{
    const fetchData = async ()=>{
      const result = await axios.get(`http://localhost:5000/userFields/${id}`);
      console.log(result);
      setUser(result.data);
    }
    fetchData()
    },[]);

    const onSubmit = async(data)=>{      
      await axios.put(`http://localhost:5000/userFields/${id}`,user);
      
      history.push("/");
      
    }
  const handleSubmit =(e)=>{
      e.preventDefault();
  }

  return (
      <div className={"update"}>
        <h1>Update User</h1>

    <Container maxWidth="xs" >
        <form className={classes.root} noValidate onSubmit={handleSubmit} autoComplete="off">
            
            <TextField  id="outlined-basic" label="" variant="filled" value={user.name} onChange={(event)=>{
                setUser({...user , name:event.target.value})
            }} />
            <TextField id="outlined-basic" label="" variant="filled" value={user.email} onChange={(event)=>{
                setUser({...user , email:event.target.value})
            }} />
            <TextField id="outlined-basic" label="" variant="filled" value={user.phone} onChange={(event)=>{
                setUser({...user , phone:event.target.value})
            }} />
            <TextField id="outlined-basic" label="" variant="filled" value={user.city} onChange={(event)=>{
                setUser({...user , city:event.target.value})
            }} />
            <TextField id="outlined-basic" label="" variant="filled" value={user.State} onChange={(event)=>{
                setUser({...user , State:event.target.value})
            }} />
            <TextField id="outlined-basic" label="" variant="filled" value={user.Country} onChange={(event)=>{
                setUser({...user , Country:event.target.value})
            }}/>
            <TextField id="outlined-basic" label="" variant="filled" value={user.Area} onChange={(event)=>{
                setUser({...user , Area:event.target.value})
            }} />
            <Button variant="contained" color="primary" onClick={onSubmit}  > update </Button>
            
        </form>
    </Container>
    </div>
  );
}
