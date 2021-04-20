import React, { useEffect,useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { Button } from '@material-ui/core';
import {Link,useHistory} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  addUser:{
    margin : 10,
    
  }
});

export default function ShowUserList() {
  const classes = useStyles();
  let history = useHistory();

  const [userList,setUserList] = useState([]);

  useEffect( () => {
      axios.get('http://localhost:5000/userFields').then((allData)=>{
          setUserList(allData.data);
      })
  }, [])

  const deleteUser = (id)=>{
      axios.delete(`http://localhost:5000/userFields/${id}`).then(()=>{
          window.location.reload(false);
      })
      
  }
  const updateUser =(id)=>{
      history.push({
      pathname: '/updateUser',
      Objectid: id  }
  )
}

  return (
    <>
      <Link to="/addUser"> 
        <Button variant="contained" color="primary" className={classes.addUser} >Add User</Button>
      </Link>
      <div className="table">
      <h1 align="center">Users List</h1>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Phone No.</StyledTableCell>
            {/* <StyledTableCell align="right">City</StyledTableCell>
            <StyledTableCell align="right">State</StyledTableCell>
            <StyledTableCell align="right">Country</StyledTableCell>
            <StyledTableCell align="right">Area</StyledTableCell> */}
            <StyledTableCell align="right">Action</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {userList.map((user,key) => (
            <StyledTableRow key={key}>
              <StyledTableCell component="th" scope="row">{user.name}</StyledTableCell>
              <StyledTableCell align="right">{user.email}</StyledTableCell>
              <StyledTableCell align="right">{user.phone}</StyledTableCell>
              {/* <StyledTableCell align="right">{user.city}</StyledTableCell>
              <StyledTableCell align="right">{user.State}</StyledTableCell>
              <StyledTableCell align="right">{user.Country}</StyledTableCell>
              <StyledTableCell align="right">{user.Area}</StyledTableCell> */}
              <StyledTableCell align="right">
                
                {<IconButton aria-label="delete" className={classes.margin} onClick={()=> deleteUser(user._id)} >
                    <DeleteIcon />
                  </IconButton>}
                  {<IconButton aria-label="delete" className={classes.margin} onClick={()=> updateUser(user._id)} >
                    <EditIcon />
                  </IconButton>}
                
              </StyledTableCell>
              
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </>
  );
}
