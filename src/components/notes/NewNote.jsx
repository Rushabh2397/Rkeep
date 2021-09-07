import { useState, useRef } from "react";
import { ClickAwayListener, Paper, TextField, Toolbar, Box } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import TextareaAutosize from 'react-textarea-autosize';
import NoteAction from './NoteAction'
import NoteListView from './NoteListView'
const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: theme.spacing(8) + 1,
        paddingTop: theme.spacing(3)
    },
    textField: {
        width: "250px",
        margin: "0 auto",
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



const NewNote = () => {
    
    const classes = useStyles();
    const title = useRef(null);
    const note = useRef(null);
    const [addNote, setAddNote] = useState(false);
    const [noteObj, setNoteObj] = useState({ title: '', note: '' })

    const InputProps = {
        className: classes.InputProps
    }

    const inputProps = {
        className: classes.inputProps
    }

    const handleClickAway = () => {
        setAddNote(!addNote)
    }

    const handleNote = (key) => {
        setNoteObj({
            title: key === 'title' ? title.current.value : noteObj.title,
            note: key === 'note' ? note.current.value : noteObj.note
        })
    }

    return (
        <Box className={classes.root}>
            <Toolbar />
            {
                !addNote ?
                    (
                        <Box className={classes.textField}>
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
                        </Box>
                    ) :

                    (< ClickAwayListener onClickAway={handleClickAway} >
                        <Box className={classes.textField}>
                            <Paper className={classes.addPaper} elevation={2}>
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
                                    />
                                </Box>
                                <Box>
                                    <TextareaAutosize
                                        className={classes.textArea}
                                        placeholder="Take a note..."
                                        ref={note}
                                        onChange={() => { handleNote('note') }}
                                        scrolling="false"
                                    />
                                </Box>
                                <NoteAction 
                                  setAddNote={setAddNote}
                                />
                            </Paper>
                        </Box>

                    </ClickAwayListener >)
            }
            <NoteListView/>
        </Box>
    );
}

export default NewNote