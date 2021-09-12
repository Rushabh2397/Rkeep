import { Drawer, List, ListItemIcon, ListItemText, ListItem, Toolbar } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import NoteOutlinedIcon from '@material-ui/icons/NoteOutlined';
//import CreateIcon from '@material-ui/icons/Create';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import clsx from 'clsx';
import { useUser } from '../context/UserContext'
import { useNote } from '../context/NoteContext'
import { getAllUserNotes} from '../api'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,

  },
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: "350px"
    }
  },
  drawerContainer: {
    overflow: 'auto'
  },
  drawerOpen: {
    width: drawerWidth,
    border: "none",
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.up('md')]: {
      width: "350px"
    }
  },
  drawerClose: {
    border: "none",
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(8) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    }
  },

}));



const Sidebar = ({ open, setOpen, active, setActive }) => {
  
  const classes = useStyles();
  const { user, userDispatch } = useUser()
  const {dispatch} = useNote() 

  const handleClick = (key) => {
    if (key === "Notes") {
      setActive('Notes');
      userDispatch({ type: 'USER_PREFERENCE', payload: { screen: 'Notes' } })
      getAllNotes({ isActive: 1, isArchived: 0 })
      localStorage.setItem('notzzUser', JSON.stringify({ ...user, screen: 'Notes' }))
    } else if (key === "Archive") {
      console.log("Archive")
      setActive('Archive')
      userDispatch({ type: 'USER_PREFERENCE', payload: { screen: 'Archive' } })
      getAllNotes({ isActive: 1, isArchived: 1 })
      localStorage.setItem('notzzUser', JSON.stringify({ ...user, screen: 'Archive' }))
    } else {
      setActive('Trash')
      userDispatch({ type: 'USER_PREFERENCE', payload: { screen: 'Trash' } })
      getAllNotes({ isActive: 0})
      localStorage.setItem('notzzUser', JSON.stringify({ ...user, screen: 'Trash' }))
    }
  }

  const getAllNotes = async (obj) => {
    try {
      console.log("inside side bar getAllNotes",obj)
        let res = await getAllUserNotes(obj);
        dispatch({ type: 'GET_ALL_NOTE', payload: res.data.data })
    } catch (error) {

    }

}

  return (
    <div>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <Toolbar />
        <List onMouseOver={() => { setOpen(true) }} onClick={()=>{handleClick("Notes")}} >
          <ListItem button key={"Notes"} selected={active === 'Notes'} >
            <ListItemIcon >
              <NoteOutlinedIcon fontSize="large" />
            </ListItemIcon>
            <ListItemText primary={"Notes"} />
          </ListItem>
        </List>
        <List onMouseOver={() => { setOpen(true) }} onClick={()=>{handleClick("Archive")}} >
          <ListItem button key={"Archive"} selected={active === 'Archive'} >
            <ListItemIcon >
              <ArchiveOutlinedIcon fontSize="large" />
            </ListItemIcon>
            <ListItemText primary={"Archive"} />
          </ListItem>
        </List>
        <List onMouseOver={() => { setOpen(true) }} onClick={()=>{handleClick("Trash")}}>
          <ListItem button key={"Trash"} selected={active === 'Trash'} >
            <ListItemIcon >
              <DeleteOutlineOutlinedIcon fontSize="large" />
            </ListItemIcon>
            <ListItemText primary={"Trash"} />
          </ListItem>
        </List>

      </Drawer>

    </div>
  )
}

export default Sidebar