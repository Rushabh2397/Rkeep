import {Route,Redirect} from 'react-router-dom'
import {useUser} from './components/context/UserContext'


export let PrivateRoute= ({ path,...props })=> {

    const { user } = useUser();
    return user.token ? (
      <Route  {...props} path={path}/>
    ) : (
      <Redirect to= "/login"/>
    )
}