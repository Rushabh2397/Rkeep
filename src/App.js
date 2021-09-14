import './App.css';
import Note from './components/notes/Note'
import Signup from './components/signup/Signup'
import Login from './components/login/Login'
import { Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import './config/AxiosConfig'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <div className="App">

      <Toaster
        position='top-right'
        toastOptions={{
          duration:1500
        }}
      />

      <Switch>
        <Route path='/signup' component={Signup} exact />
        <Route path='/login' component={Login} exact />
        <PrivateRoute path='/' component={Note} ></PrivateRoute>
      </Switch>

    </div >
  );
}

export default App;
