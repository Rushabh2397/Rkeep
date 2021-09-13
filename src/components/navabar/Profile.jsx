import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';
import { useUser } from '../context/UserContext'
import { useNote } from '../context/NoteContext'
import { useHistory } from 'react-router';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
   profile:{
       width:"9rem",
       padding:"1rem"
   },
   name:{
       textTransform:'capitalize',
       fontSize:"1rem",
       fontWeight:500
       
   },
   noteCount:{
      fontWeight:500
   },
   logout:{
       fontWeight:500,
       cursor:"pointer",
       margin:0,
       padding:0
   } 

}))


const Profile = ({ anchorEl, handleClose }) => {
    const classes = useStyles()
    const open = Boolean(anchorEl);
    const { user } = useUser()
    const {noteObj} = useNote()
    const history = useHistory()

    const logout = ()=>{
        localStorage.clear('notzzUser');
        history.push('/login')
    }

    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}

        >
            <div className={classes.profile}  onMouseLeave={() => { handleClose() }}>
                <div>
                <div>
                    <span className={classes.name}>{user.name}</span>
                </div>
                <hr></hr>
                <div>
                    <span className={classes.noteCount}>Note count : {noteObj.noteCount}</span>
                </div>
                <hr></hr>
                <div>
                    <span className={classes.noteCount}>Total notes : {noteObj.totalNotes}</span>
                </div>
                <hr></hr>
                <Button onClick={logout} className={classes.logout}>Logout</Button>
                </div>
            </div>

        </Popover>
    );
}

export default Profile