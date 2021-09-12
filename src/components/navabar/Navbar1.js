import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Box, Icon } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        // marginRight: theme.spacing(1),
        [theme.breakpoints.down('sm')]: {
            fontSize:"1rem"
        },
    },
    title: {
        fontWeight: 400,
        fontSize: "1.55rem",
        color: "#5f6368",
        padding: "12px",
        [theme.breakpoints.down('sm')]: {
            fontSize:"1rem"
        },
    },

    navbar: {
        display: "flex",
        alignItem: "center",
        justifyContent: "space-between"
    },
    textField: {

        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "80ch",
        [theme.breakpoints.down('sm')]: {
            display:"none"
        },

    },
    searchBox: {
        position: 'relative'
    },
    search: {
        padding: "0px 32px",
        height: "2.7rem",
        [theme.breakpoints.down('sm')]: {
            height:"1rem",
            padding:"0px 10px"
        },
    },
    searchIcon: {
        position: 'absolute',
        zIndex: 1000,
        top: "9px",
        left: "15px",
    },
    row: {
        display: 'flex',
        alignItem: 'center'
    }

}));


const Navbar = () => {
    const classes = useStyles();
    const InputProps = {
        className: classes.search
    }

    return (
        <div className={classes.root}>
            <AppBar position="static" style={{backgroundColor:"white"}} >
                <Toolbar className={classes.navbar}>
                    <Box className={classes.row}>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon fontSize="large" />
                        </IconButton>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="menu">
                            <Icon className="fa fa-lightbulb" style={{ fontSize: 32, color: "gold" }} />
                        </IconButton>

                        <Typography variant="h6" className={classes.title}>
                            Rkeep
                    </Typography>
                    </Box>
                    <Box className={classes.searchBox}>
                        <TextField className={classes.textField} type="search" variant="outlined" size="small" InputProps={InputProps} placeholder="Search" />
                        <span className={classes.searchIcon}><SearchIcon style={{ fontSize: 28 }} /></span>
                    </Box>

                    <Box>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="menu" >
                            <DragHandleIcon fontSize="large" />
                        </IconButton>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="menu">
                            <AccountCircleOutlinedIcon fontSize="large" />
                        </IconButton>
                    </Box>

                </Toolbar>
            </AppBar>
        </div>

    );
}

export default Navbar