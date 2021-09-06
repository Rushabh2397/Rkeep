import { Box, Toolbar, TextField } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import TextareaAutosize from 'react-textarea-autosize';
import PaletteOutlinedIcon from '@material-ui/icons/PaletteOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
//import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import Modal from './modal'
import { useRef, useState } from "react";

const useStyles = makeStyles((theme) => ({
    row: {
        display: 'flex',
        flexDirection: "column"
    },
    notesContainer: {
        display: "flex",
        marginLeft: theme.spacing(8) + 1,
        paddingTop: theme.spacing(3)
    },
    notes: {
        width: "250px",
        margin: '0 auto'
    },
    noteCard: {
        display: 'flex',
        position: 'relative',
        width: '250px',
        border: "1px solid black",
        borderRadius: "3px"
    },
    title: {

    },
    notepad: {
        overflow: "hidden",
        padding: "10px",
        border: "none",
        '&:focus': {
            outline: "none !important"
        }

    },
    InputProps: {
        paddingLeft: "10px"
    },
    action: {
        display: "flex",
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: "10px"

    },
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
    },
    hide: {
        display: 'none'
    }

}));

const Notes = () => {
    const classes = useStyles();
    const palette = useRef(null);
    const title = useRef(null);
    const notes = useRef(null)
    const [show, setShow] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const [note, setNote] = useState({ title: '', note: '' })

    const handlePopoverOpen = () => {
        setAnchorEl(palette.current);

    }

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const modal = () => {
        return <Modal anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
    }

    const handleNote = (obj) => {
        setNote({
            title: obj.key === 'title' ? title.current.value : note.title,
            note: obj.key === 'note' ? notes.current.value : note.note
        })
    }

    const InputProps = {
        className: classes.InputProps
    }

    return (
        <div >
            <Toolbar />
            <div className={classes.notesContainer}>

                <Box className={classes.notes} >
                    {console.log(note)}
                    <TextField className={show ? ' ' : classes.hide} size="small" variant="outlined" placeholder="Take a note... " fullWidth onClick={() => { setShow(false) }} />

                    <Box className={show ? classes.hide : `${classes.row} ${classes.noteCard}`}>

                        <TextField className={classes.title} inputRef={title} size="small" placeholder="Title" InputProps={InputProps} onChange={()=>{handleNote({key:'title'})}} />
                        <TextareaAutosize className={classes.notepad} ref={notes} placeholder="Take a note..." scrolling={"false"} onChange={()=>{handleNote({key:'note'})}} />
                        <Box className={classes.action}>
                            <PaletteOutlinedIcon ref={palette} onMouseOver={handlePopoverOpen} />
                            {anchorEl !== null ? modal() : ''}
                            <ArchiveOutlinedIcon />
                            <AddOutlinedIcon />
                            <CancelOutlinedIcon onClick={() => setShow(true)} />
                        </Box>

                    </Box>


                </Box>
            </div>
        </div>
    )
}

//onMouseLeave={handlePopoverClose}
export default Notes

