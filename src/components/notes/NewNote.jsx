import { useState, useRef } from "react";
import { ClickAwayListener, Paper, TextField, Toolbar } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import TextareaAutosize from 'react-textarea-autosize';
import NoteAction from './NoteAction'
import { addUserNote } from '../api'
import { useNote } from '../context/NoteContext'
import Color from './color.json'
import toast from 'react-hot-toast'

const useStyles = makeStyles((theme) => ({
    noteDisplay: {
        marginLeft: theme.spacing(8),
        paddingTop: theme.spacing(3),
    },
    paperContainer: {
        width: "80%",
        margin: "0 auto",
        [theme.breakpoints.up('sm')]: {
            width: "70%"
        },
        [theme.breakpoints.up('md')]: {
            width: "60%"
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



const NewNote = () => {

    const classes = useStyles();
    const title = useRef(null);
    const note = useRef(null);
    const [addNote, setAddNote] = useState(false);
    const [noteObj, setNoteObj] = useState({ title: '', note: '',is_archived:0, is_pinned: 0 })
    const [selectedColor, setSelectedColor] = useState(1)
    const { dispatch } = useNote()

    const updateColor = (id) => {
        setSelectedColor(id)
    }

    const updateArchive = ()=>{
        setNoteObj({
            ...noteObj,
            is_archived : noteObj.is_archived===1 ? 0:1
        })
    }

    const InputProps = {
        className: classes.InputProps
    }



    const handleClickAway = async () => {
        try {
            setAddNote(!addNote)
            let userNote = noteObj.note
            if (userNote.trim() !== "") {
                let newNote = {
                    title : noteObj.title,
                    note : noteObj.note,
                    is_archived: noteObj.is_archived,
                    color : Color[selectedColor - 1].name  ,
                    is_pinned: noteObj.is_pinned
                }
                const res = await addUserNote(newNote)
                toast.success(res.data.message)
                if(noteObj.is_archived===0){
                    dispatch({ type: 'ADD', payload: res.data.data })
                }
                
            }

        } catch (error) {
            toast.error('Something went wrong plz try again.')
        } finally {
            setNoteObj({ title: '', note: '', is_archived: false, is_pinned: false })
            setSelectedColor(1)
        }
    }

    const handleNote = (key) => {
        setNoteObj({

            title: key === 'title' ? title.current.value : noteObj.title,
            note: key === 'note' ? note.current.value : noteObj.note,
            is_archived : noteObj.is_archived
        })
    }



    return (

        <div className={classes.noteDisplay}>
            <Toolbar />
            {!addNote ?
                (
                    <div className={classes.paperContainer}>
                        <Paper>
                            <TextField
                                size="small"
                                variant="outlined"
                                placeholder="Take a note..."
                                fullWidth
                                onClick={() => { setAddNote(!addNote) }}
                                InputProps={InputProps}
                            />
                        </Paper>
                    </div>
                )
                :
                (
                    < ClickAwayListener onClickAway={() => { handleClickAway() }} >
                        <div className={classes.paperContainer}>

                            <Paper elevation={2} style={{ backgroundColor: Color[selectedColor - 1].color }}>
                                <TextareaAutosize
                                    className={classes.textAreaTitle}
                                    placeholder="Title"
                                    ref={title}
                                    onChange={() => { handleNote('title') }}
                                    scrolling="false"
                                    style={{ backgroundColor: Color[selectedColor - 1].color }}
                                />
                                <TextareaAutosize
                                    className={classes.textAreaNote}
                                    placeholder="Take a note..."
                                    ref={note}
                                    onChange={() => { handleNote('note') }}
                                    scrolling="false"
                                    style={{ backgroundColor: Color[selectedColor - 1].color }}
                                />
                                <NoteAction
                                    setAddNote={setAddNote}
                                    setNoteObj={setNoteObj}
                                    noteObj={noteObj}
                                    icon={{ palette: true, archive: true, cancel: true }}
                                    updateColor={updateColor}
                                    updateArchive={updateArchive}
                                />
                            </Paper>
                        </div>
                    </ClickAwayListener>

                )}
        </div>
    );
}

export default NewNote