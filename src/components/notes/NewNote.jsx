import { useState, useRef } from "react";
import { ClickAwayListener, Paper, TextField, Toolbar, Box } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import TextareaAutosize from 'react-textarea-autosize';

const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: theme.spacing(8) + 1,
        paddingTop: theme.spacing(3)
    },
    textField: {
        width: "250px",
        margin: "0 auto"
    },

    textArea: {
        width: "222px",
        margin: 0,
        padding: "10px 14px",
        border: "none",
        '&:focus': {
            outline: "none !important"
        }
    },
    addPaper: {
        minHeight: "120px"
    },
    InputProps: {
        paddingLeft: "13px",
        paddingRight: "13px"
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
                                />
                            </Paper>
                        </Box>
                    ) :

                    (< ClickAwayListener onClickAway={handleClickAway} >
                        <Box className={classes.textField}>
                            <Paper className={classes.addPaper}>
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
                                    />
                                </Box>
                            </Paper>
                        </Box>

                    </ClickAwayListener >)
            }
        </Box>
    );
}

export default NewNote