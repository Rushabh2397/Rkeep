import './App.css';
import Note from './components/notes/Note'
import Signup from './components/signup/Signup'
import Login from './components/login/Login'
import { Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import './config/AxiosConfig'
function App() {
  return (
    <div className="App">

     

      <Switch>
        <Route path='/signup' component={Signup} exact />
        <Route path='/login' component={Login} exact />  
        <PrivateRoute path='/' component={Note} exact></PrivateRoute>
      </Switch>
    </div >
  );
}

export default App;
