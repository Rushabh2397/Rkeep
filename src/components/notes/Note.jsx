import NewNote from './NewNote'
import NoteListView from './NoteListView'
import { getAllUserNotes, updateUserNote } from '../api'
import { useEffect, useState } from "react";
import { useNote } from '../context/NoteContext'
import { useUser } from '../context/UserContext'
import Navabar from '../navabar/Navbar'
import { Toolbar } from '@material-ui/core';
import GridView from './GridView';
import Loader from '../Loader/Loader'
import Empty from './Empty'
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    noteDisplay: {
        marginLeft: theme.spacing(8),
        paddingTop: theme.spacing(3),
        
    },
    noteText: {
        width: "80%",
        margin: "0 auto",    
        [theme.breakpoints.up('sm')]: {
            width: "70%"
        },
        [theme.breakpoints.up('md')]: {
            width: "60%"
        }
    },
    gridPinnedNotes: {
        padding: "0 8.5rem",
        marginLeft: theme.spacing(6),
        marginTop: "1.5rem",
        [theme.breakpoints.down('md')]: {
            padding:"0 2.9rem"
        },
    }


}))

const Note = () => {
    const classes = useStyles();
    const { noteObj, dispatch } = useNote()
    const { user } = useUser()
    const [loader, setLoader] = useState(false)
    const pinnedNotes = noteObj.notes.length > 0 ? noteObj.notes.filter(note => note.is_pinned === 1) : []
    const otherNotes = noteObj.notes.length > 0 ? noteObj.notes.filter(note => note.is_pinned === 0) : []

    const updateNotes = async (note) => {
        try {
            note.note_id = note._id
            const res = await updateUserNote(note)
            if (res.data.status === 'success') {
                getAllNotes()
            }

        } catch (error) {

        }
    }
    const getAllNotes = async () => {
        try {
            setLoader(true)
            let obj = {}
            if (user.screen === 'Notes') {
                obj.isActive = 1
                obj.isArchived = 0
            } else if (user.screen === 'Archive') {
                obj.isActive = 1
                obj.isArchived = 1
            } else {
                obj.isActive = 0
            }
            let res = await getAllUserNotes(obj);
            setLoader(false)
            dispatch({ type: 'GET_ALL_NOTE', payload: res.data.data })
        } catch (error) {
            setLoader(false)
        }


    }

    useEffect(() => {
        getAllNotes();
        return () => {
            setLoader(null)
        }
        // eslint-disable-next-line
    }, [])
    return (
        <div>
            <Navabar />
            {user.screen === 'Notes' ? <NewNote /> : (<Toolbar />)}
            {
                user.view === 'List' ?

                    (pinnedNotes.length > 0
                        &&
                        <div>
                            <div className={classes.noteDisplay}><div className={classes.noteText}>Pinned Notes</div></div>
                            {
                                pinnedNotes.map((note, index) => {
                                    return <NoteListView key={index} notz={note} updateNotes={updateNotes} />
                                })
                            }

                        </div>
                    ) :
                    (pinnedNotes.length > 0
                        &&
                        <div>
                            <div className={classes.gridPinnedNotes}><div>Pinned Notes</div></div>
                            <GridView notz={pinnedNotes} updateNotes={updateNotes} />
                        </div>
                    )
            }
            {
                user.view === 'List' ?

                    (
                        // noteObj.notes && noteObj.notes.length > 0
                        otherNotes.length > 0
                            ?
                            (
                                <div>
                                    {pinnedNotes.length > 0 && <div className={classes.noteDisplay}><div className={classes.noteText}>Other Notes</div></div>}
                                    {
                                        (otherNotes.map((note, index) => {
                                            return <NoteListView key={index} notz={note} updateNotes={updateNotes} />
                                        }))
                                    }
                                </div>
                            )
                            :
                            (<Empty />)
                    ) :
                    (

                        otherNotes.length > 0
                            ?
                            <div>
                                {pinnedNotes.length > 0 && <div className={classes.gridPinnedNotes}><div>Other Notes</div></div>}
                                <GridView notz={otherNotes} updateNotes={updateNotes} />
                            </div>
                            :
                            (<Empty />)
                    )
            }
            <Loader visible={loader} />
        </div >
    )
}


export default Note