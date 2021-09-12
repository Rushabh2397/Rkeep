import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Box, Icon, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Sidebar from '../sidebar/Sidebar'
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(0),
        padding: theme.spacing(1)
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
    const [active,setActive] = useState('Notes')

    const InputProps = {
        className: classes.searchBarz
    }
    const searchBar = () => {
        console.log("here")
        return <div className={classes.searchBar}>
            <div style={{ position: 'relative' }}>
                <TextField variant="outlined" type="search" placeholder="Search..." fullWidth InputProps={InputProps} />
                <ArrowBackIcon style={{ position: 'absolute', zIndex: 101, left: 5, top: 15 }} onClick={() => { setVisible(!visible) }} />
            </div>

        </div>
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
                            <Icon className="fa fa-lightbulb" style={{ color: "gold" }} />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {active}
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
                        <TextField className={classes.textField} type="search" variant="outlined" size="small" placeholder="Search" />
                    </Box>

                    <Box>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="menu">
                            <DragHandleIcon />
                        </IconButton>

                        <IconButton className={classes.menuButton} color="inherit" aria-label="menu">
                            <AccountCircleOutlinedIcon />
                        </IconButton>
                    </Box>

                </Toolbar>
                {visible && searchBar()}
            </AppBar>
            <Sidebar open={open} setOpen={setOpen} active={active} setActive={setActive} />
        </div>

    )
}

export default Navbar