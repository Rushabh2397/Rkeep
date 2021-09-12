import Color from './color.json'
import {  Paper } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import TextareaAutosize from 'react-textarea-autosize';
import UpdateNote from './UpdateNote'
import { useState } from 'react';
import NoteAction from './NoteAction'



const useStyles = makeStyles(theme => ({
    myMasonryGrid: {
        display: "-webkit-box",
        display: "-ms-flexbox",
        display: "flex",
        width: "auto",
    },
    myMasonryGridColumn: {
        backgroundClip: "padding-box"
    },
    noteDisplay: {
        marginLeft: theme.spacing(6),
        paddingTop: theme.spacing(5),
    },
    // paperContainer: {
    //     width: "80%",
    //     margin: "0 auto",
    //     [theme.breakpoints.up('sm')]: {
    //         width: "70%"
    //     },
    //     [theme.breakpoints.up('md')]: {
    //         width: "60%"
    //     }
    // },
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
   
}))

const GridViewSub = ({notz,updateNotes}) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const noteColor  = Color.find(c=>c.name===notz.color)

    const updateNote = ()=>{
        return <UpdateNote notz={notz} open={open} setOpen={setOpen} id={noteColor.id}/>
    }
     
    return (
        <div className={classes.noteDisplay} >


            <div className={classes.paperContainer} >
                <Paper className={classes.gridNoteCss} elevation={2} style={{ backgroundColor: Color[noteColor.id - 1].color }} >
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
                            //console.log("Kupd", id, notz)
                            updateNotes({
                                _id: notz._id,
                                color: Color[id - 1].name
                            })
                        }}

                        updateArchive={() => {
                            console.log("notzAr", notz)
                            updateNotes({
                                _id: notz._id,
                                is_archived: notz.is_archived === 1 ? 0 : 1
                            })
                        }}
                        noteObj={notz}
                        icon={{ palette: true, archive: true, delete: true }}

                    />
                </Paper>
            </div>

            {open && updateNote()}

        </div>
    )
}


export default GridViewSub