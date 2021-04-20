import react from 'react';
import {Container} from '@material-ui/core';
import AddUser from './components/addUser.js';
import ShowUserList from './components/usersList.js';
import updateUser from './components/updateUser.js';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <Container maxWidth="lg" >
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={ShowUserList}/>
            <Route exact path="/addUser" component={AddUser}/>
            <Route exact parth="/updateUser" component={updateUser} />
          </Switch>
        </Router>      
      </div>
    </Container>
  );
}

export default App;
