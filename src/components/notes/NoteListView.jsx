import { useState, useRef } from "react";
import { ClickAwayListener, Paper, TextField, Toolbar, Box } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import TextareaAutosize from 'react-textarea-autosize';
import NoteAction from './NoteAction'




const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: theme.spacing(8) + 1,
        paddingTop: theme.spacing(3)
    },
    textField: {
        width: "250px",
        margin: "0 auto",
        marginTop: "25px",
        [theme.breakpoints.up('sm')]: {
            width:"500px"
        },

        [theme.breakpoints.up('md')]: {
            width:"700px"
        }
    },

    textArea: {
        width: "222px",
        margin: 0,
        padding: "15px 14px",
        border: "none",
        '&:focus': {
            outline: "none !important"
        },
        [theme.breakpoints.up('sm')]: {
            width:"472px",
            padding:"25px 14px"
        },

        [theme.breakpoints.up('md')]: {
            width:"672px"
        }
    },
    addPaper: {
        minHeight: "110px"
    },
    InputProps: {
        paddingLeft: "13px",
        paddingRight: "13px",
        [theme.breakpoints.up('md')]: {
            padding:"8px 13px"
        }
    },
    inputProps: {
        border: "none"
    }

}))






const NoteListView = () => {

    const classes = useStyles();
    const title = useRef(null);
    const note = useRef(null);
    const [addNote, setAddNote] = useState(false);
    const [noteObj, setNoteObj] = useState({ title: '', note: '' })
    const [elevate,setElevate] = useState(false)
    const InputProps = {
        className: classes.InputProps
    }

    const inputProps = {
        className: classes.inputProps
    }

    const handleClickAway = () => {
        setElevate(false)
    }

    const handleNote = (key) => {
        setNoteObj({
            title: key === 'title' ? title.current.value : noteObj.title,
            note: key === 'note' ? note.current.value : noteObj.note
        })
    }


    return (
        < ClickAwayListener onClickAway={handleClickAway} >
            <Box className={classes.textField}>
                <Paper className={classes.addPaper} elevation={elevate ? 10 : 2}>
                    <Box>
                        <TextField
                            size="small"
                            variant="standard"
                            placeholder="Title"
                            fullWidth
                            InputProps={InputProps}
                            inputProps={inputProps}
                            inputRef={title}
                            onChange={() => { handleNote('title') }}
                            value="Rushabh"
                            onClick= {()=>{setElevate(true)}}
                        />
                    </Box>
                    <Box>
                        <TextareaAutosize
                            className={classes.textArea}
                            placeholder="Take a note..."
                            ref={note}
                            onChange={() => { handleNote('note') }}
                            scrolling="false"
                            onClick= {()=>{setElevate(true)}}
                        />
                    </Box>
                    <NoteAction
                        setAddNote={setAddNote}
                    />
                </Paper>
            </Box>
        </ClickAwayListener>
    )
}


export default NoteListView