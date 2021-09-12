import NewNote from './NewNote'
import NoteListView from './NoteListView'
import { getAllUserNotes, updateUserNote } from '../api'
import { useEffect } from "react";
import { useNote} from '../context/NoteContext'
import {useUser} from '../context/UserContext'
import Navabar from '../navabar/Navbar'
import { Toolbar } from '@material-ui/core';



const Note = () => {

    const { noteObj, dispatch } = useNote()
    const {user} = useUser()

    const updateNotes = async (note) => {
        try {
            note.note_id = note._id
            const res = await updateUserNote(note)
            if(res.data.status==='success'){
                getAllNotes()
            }
            
        } catch (error) {

        }
    }
    const getAllNotes = async () => {
        try {
            let obj={}
            if(user.screen==='Notes'){
                obj.isActive =1
                obj.isArchived=0
            }else if(user.screen==='Archive'){
                obj.isActive =1
                obj.isArchived=1
            } else {
                obj.isActive =0
            }
            let res = await getAllUserNotes(obj);
            dispatch({ type: 'GET_ALL_NOTE', payload: res.data.data })
        } catch (error) {

        }

    }

    useEffect(() => {
        getAllNotes()
        // eslint-disable-next-line
    }, [])
    return (
        <div>
            <Navabar />
            {user.screen==='Notes' ? <NewNote /> :(<Toolbar/>)}
            {

                noteObj.notes && noteObj.notes.length > 0
                    ?
                   ( (noteObj.notes.map((note, index) => {
                        return <NoteListView key={index} notz={note} updateNotes={updateNotes} />
                    })))
                    :
                    (<div> Nothing</div>)
            }
        </div >
    )
}


export default Note