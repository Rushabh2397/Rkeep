import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useRef } from "react";
import { ClickAwayListener, Paper } from "@material-ui/core"
import TextareaAutosize from 'react-textarea-autosize';
import NoteAction from './NoteAction'
import { updateUserNote,getAllUserNotes } from '../api'
import { useNote } from '../context/NoteContext'
import { useUser } from '../context/UserContext'
import Color from './color.json'
import toast from 'react-hot-toast'
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import StarOutlinedIcon from '@material-ui/icons/StarOutlined';

const useStyles = makeStyles((theme) => ({

    paperContainer: {
        width: "80%",
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        margin: "0 auto",
        [theme.breakpoints.up('sm')]: {
            width: "70%"
        },
        [theme.breakpoints.up('md')]: {
            width: "50%"
        }
    },
    textAreaTitle: {
        width: "100%",
        WebkitBoxSizing: "border-box",
        padding: "0.6rem",
        resize: "none",
        border: "none",
        fontSize: "1rem",
        fontWeight: 500,
        lineHeight: "1.1rem",
        letterSpacing: "0.05rem",
        '&:focus': {
            outline: "none !important"
        },
        [theme.breakpoints.up('md')]: {
            padding: '0.7rem',
            fontSize: "1.2rem"
        }
    },
    textAreaNote: {
        width: "100%",
        WebkitBoxSizing: "border-box",
        padding: "0.6rem",
        resize: "none",
        border: "none",
        fontWeight: 400,
        letterSpacing: "0.04rem",
        '&:focus': {
            outline: "none !important"
        },
        [theme.breakpoints.up('md')]: {
            padding: '0.7rem',
            fontSize: "1rem"
        }
    },

    InputProps: {
        paddingLeft: "13px",
        paddingRight: "13px",
        [theme.breakpoints.up('md')]: {
            padding: "8px 13px"
        }
    },
    pinIcon: {
        position: "absolute",
        right: "1.5rem",
        top: "8px"
    },
    paper:{
        position:'relative'
    }


}))


const UpdateNote = ({ open, notz, setOpen,id }) => {
    const classes = useStyles();
    const title = useRef(null);
    const noteRef = useRef(null);
    const { dispatch } = useNote()
    const {user} = useUser()
    
    const [selectedColor, setSelectedColor] = useState(id)

    const [note, setNote] = useState({
        _id: notz._id,
        title: notz.title,
        note: notz.note,
        is_archived: notz.is_archived ,
        is_pinned: notz.is_pinned
    })

    const updateColor = (id) => {
        setSelectedColor(id)
    }
    
    const updateArchive = ()=>{
        setNote({
            ...note,
            is_archived : note.is_archived===1 ? 0:1,
            is_pinned: note.is_archived === 0 ? 0 : note.is_pinned
        })
    }

    const handleNote = (key) => {
        setNote({
            _id: notz._id,
            title: key === 'title' ? title.current.value : note.title,
            note: key === 'note' ? noteRef.current.value : note.note,
            is_archived: note.is_archived,
            is_pinned : note.is_pinned
        })
    }

    const handlePinnedNote = (note_id) => {
        // updateNotes({
        //     _id: note_id,
        //     is_pinned: note.is_pinned === 1 ? 0 : 1,
        //     is_archived: note.is_pinned === 0 ? 0 : note.is_archived
        // })
        setNote({
            ...note,
            is_pinned: notz.is_pinned === 1 ? 0 : 1,
            is_archived: notz.is_pinned === 0 ? 0 : notz.is_archived
        })
    }

    const getAllNotes = async () => {
        try {
            let obj = user.screen==='Notes' ? { isActive: 1, isArchived: 0 } : { isActive: 1, isArchived: 1 }
            let res = await getAllUserNotes(obj);
            dispatch({ type: 'GET_ALL_NOTE', payload: res.data.data })
        } catch (error) {
            toast.error('Something went wrong plzz try again.')
        }

    }
    const handleClickAway = async () => {
        try {
            setOpen(false)
            const res = await updateUserNote({ note_id: note._id, title: note.title, note: note.note,is_pinned:note.is_pinned, is_archived: note.is_archived,color:Color[selectedColor - 1].name })
            // dispatch({ type: 'UPDATE', payload: note })
            toast.success(res.data.message)
            getAllNotes()
        } catch (error) {
            toast.error('Something went wrong plzz try again.')
        }

    }

    return (

        <Modal
            open={open}
            //onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            className={classes.paperContainer}
        >
            < ClickAwayListener onClickAway={handleClickAway} >


                <div >
                    <Paper className={classes.paper} elevation={2} style={{ backgroundColor: Color[selectedColor - 1].color }} >
                        <TextareaAutosize
                            className={classes.textAreaTitle}
                            placeholder="Title"
                            ref={title}
                            onChange={() => { handleNote('title') }}
                            scrolling="false"
                            style={{ backgroundColor: Color[selectedColor - 1].color }}
                            value={note.title}
                        />
                        <TextareaAutosize
                            className={classes.textAreaNote}
                            placeholder="Take a note..."
                            ref={noteRef}
                            onChange={() => { handleNote('note') }}
                            scrolling="false"
                            style={{ backgroundColor: Color[selectedColor - 1].color  }}
                            value={note.note}
                        />
                        <NoteAction
                            // setAddNote={setAddNote}
                            setNoteObj={setNote}
                            noteObj={note}
                            icon={{ palette: true, archive: true, close: true }}
                            setOpen={setOpen}
                            updateColor={updateColor}
                            updateArchive={updateArchive}
                        />
                        {user.screen !== 'Trash' && <div onClick={() => { handlePinnedNote(note._id) }} className={classes.pinIcon}>{note.is_pinned ? <StarOutlinedIcon /> : <StarBorderOutlinedIcon />}</div>}
                    </Paper>
                </div>
            </ClickAwayListener>
        </Modal>

    )
}

export default UpdateNote