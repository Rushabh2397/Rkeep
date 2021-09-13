import React, {  useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Box, Icon, TextField,Avatar } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import DragHandleIcon from '@material-ui/icons/DragHandle';
//import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Sidebar from '../sidebar/Sidebar'
import { getAllUserNotes} from '../api'
import { useUser } from '../context/UserContext'
import {useNote} from '../context/NoteContext'
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import Profile from './Profile'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(0),
        padding: theme.spacing(1),
    },
    title: {
        padding: theme.spacing(1),
        fontSize: "1.3rem",
        fontWeight: "400",
        color: "#5f6368"
    },
    row: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },
    searchBox: {
        [theme.breakpoints.up('sm')]: {
            display: "none"
        },
    },
    searchBar: {
        width: "100%",
        position: 'absolute',
        zIndex: 100,
        background: 'white'
    },
    searchBarz: {
        padding: "0 25px"
    },
    textField: {

        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "40ch",
        [theme.breakpoints.down('sm')]: {
            display:"none"
        },
        [theme.breakpoints.up('sm')]: {
            display:"flex"
        },
        [theme.breakpoints.up('md')]: {
            width:"60ch"
        }

    },


}));



const Navbar = () => {
    const classes = useStyles();
    const [visible, setVisible] = useState(false);
    const [open, setOpen] = useState(false);
    const {user,userDispatch} = useUser()
    const [active,setActive] = useState(user.screen||'Notes')
    const [anchorEl, setAnchorEl] = useState(null);
    
    const {dispatch} = useNote()
    const search = useRef(null)
    const InputProps = {
        className: classes.searchBarz
    }
    
    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleView  =()=>{
        let view = user.view === 'List' ? 'Grid' : 'List'
        userDispatch({ type: 'USER_PREFERENCE', payload: { view: view } })
        localStorage.setItem('notzzUser', JSON.stringify({ ...user, view:view  }))
    }
   

    const searchBar = () => {
        return <div className={classes.searchBar}>
            <div style={{ position: 'relative' }}>
                <TextField inputRef={search} variant="outlined" type="search" placeholder="Search..." fullWidth InputProps={InputProps} onChange={searchOperation} />
                <ArrowBackIcon style={{ position: 'absolute', zIndex: 101, left: 5, top: 15 }} onClick={() => { setVisible(!visible); search.current.value=''  }} />
            </div>

        </div>
    }

    const searchOperation =async (value)=>{
        let obj={}
        if(user.screen==='Notes'){
            obj.isActive =1
            obj.isArchived=0    
            obj.search = search.current.value
        }else if(user.screen==='Archive'){
            obj.isActive =1
            obj.isArchived=1
            obj.search = search.current.value
        } else {
            obj.isActive =0
            obj.search = search.current.value
        }
        let res = await getAllUserNotes(obj);
        dispatch({ type: 'GET_ALL_NOTE', payload: res.data.data })
    }

    return (
        <div className={classes.root}>
            <AppBar position="fixed" color="transparent"  style={{zIndex:1300}}>
                <Toolbar className={classes.row} style={{backgroundColor:"#fff"}}>
                    <Box className={classes.row}>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="menu" onClick={()=>{setOpen(!open)}} >
                            <MenuIcon />
                        </IconButton>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="menu">
                            <Icon className="fa fa-lightbulb fa-md" style={{ color: "gold" }} />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {user.screen}
                        </Typography>
                    </Box>

                    {!visible &&
                        <Box className={`${classes.row} ${classes.searchBox}`}>
                            <IconButton className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => { setVisible(!visible) }}>
                                <SearchIcon />
                            </IconButton>
                        </Box>

                    }
                    <Box className={classes.row}>
                        <TextField inputRef={search} className={classes.textField} type="search" variant="outlined" size="small" placeholder="Search" onChange={searchOperation}/>
                    </Box>

                    <Box>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleView}>
                         {  user.view!=='List' ? <DragHandleIcon fontSize="large" style={{color:'gray',fontSize:"2.5rem"}} /> : (<ViewComfyIcon fontSize="large" style={{color:'gray'}}/>)}
                        </IconButton>

                        <IconButton className={classes.menuButton} color="inherit" aria-label="menu">
                            {/* <AccountCircleOutlinedIcon fontSize="large"/> */}
                            <Avatar src="/broken-image.jpg" onMouseEnter={(e) => { setAnchorEl(e.currentTarget) }} onClick={(e) => { setAnchorEl(e.currentTarget) }}/>

                        </IconButton>
                    </Box>

                </Toolbar>
                {visible && searchBar()}
            </AppBar>
            <Sidebar open={open} setOpen={setOpen} active={active} setActive={setActive} />
            <Profile anchorEl={anchorEl} handleClose={handleClose} />
        </div>

    )
}

export default Navbar