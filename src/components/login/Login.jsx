import { Paper, TextField, Button, Typography} from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import { useState } from "react";
import {useHistory,Link} from 'react-router-dom'
import { userLogin } from '../api'
import { useUser } from '../context/UserContext'
import Loader from '../Loader/Loader'
import toast from 'react-hot-toast'
import validator from 'validator';

const useStyles = makeStyles((theme) => ({
    loginFormContainer:{
       display:"flex",
       justifyContent:"center",
       alignItems:"center",
       minHeight:"100vh"
    },
    loginContainer:{
        width:"300px",
        maxWidth:"300px"
    },
    loginForm: {
        padding:"2.2rem 1.4rem",
        textAlign: "center",
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 220,
        }

    },

    textField:{
        marginBottom:"0.8rem"
    }
}))


const Login = () => {
    const classes = useStyles();
    const [email, setEmail] = useState({ email: '', error: false, errMsg: '' })
    const [password, setPassword] = useState({ password: '', error: false, errMsg: '' })
    const [loader,setLoader] = useState(false)
    const {userDispatch} = useUser()
    const history = useHistory()

    const submit = async () => {
        try {
            if (email.email==='') {
                setEmail({ ...email, error: true, errMsg: 'Email is required.' })
            }
            if(!validator.isEmail(email.email)){
                setEmail({ ...email, error: true, errMsg: 'Email is not valid.' })
            }
            if (password.password === '') {
                setPassword({ ...password, error: true, errMsg: 'Password is required.' })
            }
            
    
            if(email.errMsg==='' || password.errMsg===''){
                setLoader(true)
                const res = await userLogin({email:email.email,password:password.password})
                let user = res.data.data
                toast.success(res.data.message)
                localStorage.setItem('notzzUser',JSON.stringify({name:user.name,email:user.email,token:user.token,view:'List',screen:'Notes'}))
                userDispatch({type:'Login',payload:user})
                setLoader(false)
                history.push('/')
            }
        } catch (error) {
            setLoader(false)
            toast.error(error.response.data.message)
        } 
        
    }

    const handleField = (e, key) => {
     
        if (key === 'email') {
            setEmail({ email: e.target.value ? e.target.value : '', error: '', errMsg: '' })
        } else{
            setPassword({ password: e.target.value ? e.target.value : '',error: '', errMsg: '' })  
        }
    }

    return (
        <div className={classes.loginFormContainer}>
            <div className={classes.loginContainer} >
                <Paper  elevation={5}>
                    <form className={classes.loginForm}>
                        <Typography variant="h5">Login</Typography>
                        <div className={classes.textField}>
                            <TextField
                                placeholder="Email"
                                error={email.error ? true : false}
                                //id="standard-error-helper-text"
                                helperText={email.error ? email.errMsg : ''}
                                onChange={(e) => { handleField(e,'email')}}
                            />
                        </div>
                        <div className={classes.textField}>
                            <TextField
                                type="password"
                                placeholder="Password"
                                error={password.error ? true : false}
                                //id="standard-error-helper-text"
                                helperText={password.error ? password.errMsg : ''}
                                onChange={(e) => { handleField(e,'password') }}
                            />
                        </div>
                        <div className={classes.textField}>
                            <Button onClick={submit} variant="contained" style={{ background: "#1A73E8", color: "#fff", paddingLeft: "1.4rem", paddingRight: "1.4rem" }}>
                                Login
                            </Button>

                        </div>
                        <Typography style={{ marginBottom: "0.1rem", marginTop: "0.2rem" }} variant="subtitle2" >Don't have an account ? <Link to="/signup" >Signup</Link> </Typography>
                    </form>
                </Paper>
            </div>
            <Loader visible={loader}/>
        </div>
    )
}

export default Login