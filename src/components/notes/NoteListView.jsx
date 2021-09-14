import { useState } from "react";
import { Paper } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import TextareaAutosize from 'react-textarea-autosize';
import NoteAction from './NoteAction'
import UpdateNote from './UpdateNote'
import Color from './color.json'
import { useUser } from '../context/UserContext'
import toast from 'react-hot-toast'
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import StarOutlinedIcon from '@material-ui/icons/StarOutlined';

const useStyles = makeStyles((theme) => ({
    noteDisplay: {
        marginLeft: theme.spacing(8),
        paddingTop: theme.spacing(5),
    },
    paperContainer: {
        position: 'relative',
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
    pinIcon: {
        position: "absolute",
        right: "1.5rem",
        top: "8px"
    }


}))






const NoteListView = ({ notz, updateNotes }) => {

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const noteColor = Color.find(c => c.name === notz.color)
    const { user } = useUser()

    const updateNote = () => {
        if (user.screen !== 'Trash') {
            return <UpdateNote notz={notz} open={open} setOpen={setOpen} id={noteColor.id} />
        } else {
            setOpen(false)
            toast.error("You can't edit in trash")
        }

    }

    const handlePinnedNote = (note_id) => {
        updateNotes({
            _id: note_id,
            is_pinned: notz.is_pinned === 1 ? 0 : 1,
            is_archived: notz.is_pinned === 0 ? 0 : notz.is_archived
        })
    }



    return (

        <div className={classes.noteDisplay} >


            <div className={classes.paperContainer} >
                <Paper className={classes.paper} elevation={2} style={{ backgroundColor: Color[noteColor.id - 1].color }} >
                    <TextareaAutosize
                        className={classes.textAreaTitle}
                        placeholder="Title"
                        scrolling="false"
                        style={{ backgroundColor: Color[noteColor.id - 1].color }}
                        value={notz.title}
                        onClick={() => { setOpen(true) }}
                    />
                    <TextareaAutosize
                        className={classes.textAreaNote}
                        placeholder="Take a note..."
                        scrolling="false"
                        style={{ backgroundColor: Color[noteColor.id - 1].color }}
                        value={notz.note}
                        onClick={() => { setOpen(true) }}
                    />
                    <NoteAction
                        // setNoteObj={setNote}
                        updateColor={(id) => {
                            updateNotes({
                                _id: notz._id,
                                color: Color[id - 1].name
                            })
                        }}

                        updateArchive={() => {
                            updateNotes({
                                _id: notz._id,
                                is_archived: notz.is_archived === 1 ? 0 : 1,
                                is_pinned: notz.is_archived === 0 ? 0 : notz.is_pinned
                            })
                        }}
                        noteObj={notz}
                        icon={{ palette: true, archive: true, delete: true }}

                    />
                    {user.screen !== 'Trash' && <div onClick={() => { handlePinnedNote(notz._id) }} className={classes.pinIcon}>{notz.is_pinned ? <StarOutlinedIcon /> : <StarBorderOutlinedIcon />}</div>}
                </Paper>
            </div>

            {open && updateNote()}

        </div>

    )
}


export default NoteListView