import { Paper, TextField, Button, Typography } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import { useState } from "react";
import { useHistory ,Link} from "react-router-dom";
import { userSignup } from '../api'
import { useUser } from '../context/UserContext'
import Loader from '../Loader/Loader'
import toast from 'react-hot-toast'
import validator from 'validator';



const useStyles = makeStyles((theme) => ({
    signupFormContainer: {
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    signupContainer: {
        width: "280px",
        maxWidth: "280px",
        margin: "0 auto"
    },
    textField: {
        padding: "0.4rem 0.8rem",
        marginBottom: "0.1rem"
    },
    signupPaper: {
        width: "100%",
        maxWidth:"280px",
        padding: "0.8rem",
        border: "1px solid #dadce0",
        borderRadius: "6px"
    },
    signupForm: {
        textAlign: "center",
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 220,
        },

    },
}))


const Signup = () => {
    const classes = useStyles();
    const [name, setName] = useState({ name: '', error: false, errMsg: '' })
    const [email, setEmail] = useState({ email: '', error: false, errMsg: '' })
    const [password, setPassword] = useState({ password: '', error: false, errMsg: '' })
    const [loader,setLoader] = useState(false)
    const {userDispatch} = useUser()
    const history = useHistory()

    const submit = async () => {
        try {
            if (name.name.trim().length === 0) {
                setName({ ...name, error: true, errMsg: 'Name is required.' })
            }
            if (email.email==='') {
                setEmail({ ...email, error: true, errMsg: 'Email is required.' })
            }
            if(!validator.isEmail(email.email)){
                setEmail({ ...email, error: true, errMsg: 'Email is not valid.' })
            }
            if (password.password === '') {
                setPassword({ ...password, error: true, errMsg: 'Password is required.' })
            }
    
            if(name.errMsg==='' || email.errMsg==='' || password.errMsg===''){
                setLoader(true)
                const res = await userSignup({name:name.name,email:email.email,password:password.password})
                let user = res.data.data
                toast.success(res.data.message)
                localStorage.setItem('notzzUser',JSON.stringify({name:user.name,email:user.email,token:user.token}))
                userDispatch({type:'SIGNUP',payload:user})
                setLoader(false)
                history.push('/')
            }
        } catch (error) {
            setLoader(false)
            toast.error(error.response.data.message)
        } 
        
    }

    const handleField = (e, key) => {
        if (key === 'name') {
            setName({ name: e.target.value ? e.target.value : '', error: '', errMsg: '' })
        } else if (key === 'email') {
            setEmail({ email: e.target.value ? e.target.value : '', error: '', errMsg: '' })
        } else{
            setPassword({ password: e.target.value ? e.target.value : '',error: '', errMsg: '' })  
        }
    }

    return (
        <div className={classes.signupFormContainer}>
            <div className={classes.signupContainer} >
                <Paper className={classes.signupPaper} elevation={5}>
                    <form className={classes.signupForm}>
                        <Typography variant="h5">Signup</Typography>
                        <div className={classes.textField}>
                            <TextField
                                placeholder="Name"
                                error={name.error ? true : false}
                                id="standard-error-helper-text"
                                helperText={name.error ? name.errMsg : ''}
                                fullWidth
                                onChange={(e) => { handleField(e,'name')} }
                            />
                        </div>
                        <div className={classes.textField}>
                            <TextField
                                placeholder="Email"
                                error={email.error ? true : false}
                                id="standard-error-helper-text"
                                helperText={email.error ? email.errMsg : ''}
                                onChange={(e) => { handleField(e,'email')}}
                            />
                        </div>
                        <div className={classes.textField}>
                            <TextField
                                type="password"
                                placeholder="Password"
                                error={password.error ? true : false}
                                id="standard-error-helper-text"
                                helperText={password.error ? password.errMsg : ''}
                                onChange={(e) => { handleField(e,'password') }}
                            />
                        </div>
                        <div className={classes.textField}>
                            <Button onClick={submit} variant="contained" style={{ background: "#1A73E8", color: "#fff", paddingLeft: "1.4rem", paddingRight: "1.4rem" }}>
                                Sign Up
                            </Button>

                        </div>
                        <Typography style={{ marginBottom: "0.2rem", marginTop: "0.2rem" }} variant="subtitle2" >Already have account ? <Link to="/login" >Signin</Link> </Typography>
                    </form>
                </Paper>
            </div>
            <Loader visible={loader}/>
        </div>
    )
}

export default Signup