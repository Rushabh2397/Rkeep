import { Icon, IconButton } from '@material-ui/core'
import { useUser } from '../context/UserContext'
import { makeStyles } from '@material-ui/core/styles';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';

const useStyles = makeStyles((theme) => ({
    empty: {
        marginTop: "12%",
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: "center",
        
    },
    textSize:{
        fontSize: "1.8rem", 
        fontWeight: "200",
        marginLeft:"10px",
        
        [theme.breakpoints.down('lg')]: {
            fontSize:"1.3rem"
        },
        [theme.breakpoints.down('md')]: {
            fontSize:"1.1rem"
        },
    },
    iconSize:{
        marginLeft:"10px",
    }


}))

const Empty = () => {
    const classes = useStyles();
    const { user } = useUser()

    return (
        <div className={classes.empty}>
            {
                user.screen === 'Notes'
                &&
                <div>
                    <IconButton color="inherit" aria-label="menu">
                        <Icon className="fa fa-lightbulb " style={{ color: "gray", fontSize: "3rem" }} />
                    </IconButton>
                    <div className={classes.textSize}>Notes you add appear here</div>
                </div>
            }

            {
                user.screen === 'Archive'
                &&
                <div>
                    <IconButton color="inherit" aria-label="menu">
                        <ArchiveOutlinedIcon style={{fontSize:"4rem",color:'grey'}} />
                    </IconButton>
                    <div className={classes.textSize}>Your archived notes appear here</div>
                </div>
            }

            {
                user.screen === 'Trash'
                &&
                <div>
                    <IconButton color="inherit" aria-label="menu">
                        <DeleteOutlineOutlinedIcon style={{fontSize:"4rem",color:'grey'}}/>
                    </IconButton>
                    <div className={classes.textSize}>No notes in Trash</div>
                </div>
            }


        </div>
    )

}

export default Empty