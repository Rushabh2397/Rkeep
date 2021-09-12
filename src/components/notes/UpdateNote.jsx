import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useRef } from "react";
import { ClickAwayListener, Paper } from "@material-ui/core"
import TextareaAutosize from 'react-textarea-autosize';
import NoteAction from './NoteAction'
import { updateUserNote,getAllUserNotes } from '../api'
import { useNote } from '../context/NoteContext'
import Color from './color.json'
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
    }


}))


const UpdateNote = ({ open, notz, setOpen,id }) => {
    const classes = useStyles();
    const title = useRef(null);
    const noteRef = useRef(null);
    const { dispatch } = useNote()
    
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
            is_archived : note.is_archived===1 ? 0:1
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

    const getAllNotes = async () => {
        try {
            console.log("getAllNotes")
            let res = await getAllUserNotes({ isActive: 1, isArchived: 0 });
            dispatch({ type: 'GET_ALL_NOTE', payload: res.data.data })
        } catch (error) {

        }

    }
    const handleClickAway = async () => {
        try {
            setOpen(false)
            const res = await updateUserNote({ note_id: note._id, title: note.title, note: note.note, is_archived: note.is_archived,color:Color[selectedColor - 1].name })
            // dispatch({ type: 'UPDATE', payload: note })
            getAllNotes()
        } catch (error) {
            console.log("error", error)
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
                    {console.log('notz', notz)}
                    <Paper elevation={2} style={{ backgroundColor: Color[selectedColor - 1].color }} >
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
                    </Paper>
                </div>
            </ClickAwayListener>
        </Modal>

    )
}

export default UpdateNote