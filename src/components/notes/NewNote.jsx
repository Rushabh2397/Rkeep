import { useState, useRef } from "react";
import { ClickAwayListener, Paper, TextField, Toolbar, Box } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import TextareaAutosize from 'react-textarea-autosize';
import NoteAction from './NoteAction'
import NoteListView from './NoteListView'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: theme.spacing(8),
        paddingTop: theme.spacing(3),
    },
    noteContainer:{
        width: "70%",
        margin:"0 auto"
    },
    textArea: {
       width:"100%",
       // padding:"1em",
        //border:"none",
        wordWrap: "break-word",
        resize: "none",
        padding: "1em",
        background: "transparent",
        outline: "none", //onclick or hover border
        overflow: "hidden",
        fontSize: "20px"
        
    },
    addPaper:{
        borderRadius:'5px',
        border:"1px solid black",

    }

    // InputProps: {
    //     paddingLeft: "13px",
    //     paddingRight: "13px",
    //     [theme.breakpoints.up('md')]: {
    //         padding:"8px 13px"
    //     }
    // },
    // inputProps: {
    //     border: "none"
    // }

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

    const handleClickAway = async () => {
        const res = await axios.post('http://localhost:5000/user/add_note', { title: noteObj.title, note: noteObj.note })
        console.log("res", res)
        setAddNote(!addNote)
    }

    const handleNote = (key) => {
        setNoteObj({
            title: key === 'title' ? title.current.value : noteObj.title,
            note: key === 'note' ? note.current.value : noteObj.note
        })
    }

    return (
        <div className={classes.root}>
            <Toolbar />
            <div className={classes.noteContainer}>
                {
                    !addNote ?
                        (
                            <div className={classes.textField}>
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
                        ) :

                        (< ClickAwayListener onClickAway={handleClickAway} >
                            
                                <Paper className={classes.addPaper} elevation={2}>
                                    <div>
                                        <TextareaAutosize
                                            placeholder="Title"
                                            ref={title}
                                            onChange={() => { handleNote('title') }}
                                            scrolling="false"
                                            className={classes.textArea}
                                        />
                                        <TextareaAutosize
                                            className={classes.textArea}
                                            placeholder="Take a note..."
                                            ref={note}
                                            onChange={() => { handleNote('note') }}
                                            scrolling="false"
                                        />
                                     </div>   
                                    <NoteAction
                                        setAddNote={setAddNote}
                                    />
                                </Paper>

                        </ClickAwayListener >)
                }
            </div>
        </div>
    );
}

export default NewNote