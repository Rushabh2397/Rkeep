import NewNote from './NewNote'
import NoteListView from './NoteListView'
import { getAllUserNotes, updateUserNote } from '../api'
import { useEffect } from "react";
import { useNote } from '../context/NoteContext'
import Navabar from '../navabar/Navbar'



const Note = () => {

    const { noteObj, dispatch } = useNote()

    const updateNotes = async (note) => {
        try {
            console.log("note",note)
            note.note_id = note._id
            const res = await updateUserNote(note)
            //dispatch({type:'UPDATE',payload:note}) 
            console.log("res",res)
            if(res.data.status==='success'){
                getAllNotes()
            }
            
        } catch (error) {

        }
    }
    const getAllNotes = async () => {
        try {
            console.log("getAllNotes")
            let res = await getAllUserNotes({ isActive: 1, isArchived: 0 });
            dispatch({ type: 'GET_ALL_NOTE', payload: res.data.data })
        } catch (error) {

        }

    }

    useEffect(() => {
        getAllNotes()
    }, [])
    return (
        <div>
            <Navabar />
            <NewNote />
            {console.log("here logging", noteObj)}
            {

                noteObj.notes && noteObj.notes.length > 0
                    ?
                    (noteObj.notes.map((note, index) => {
                        return <NoteListView key={index} notz={note} updateNotes={updateNotes} />
                    }))
                    :
                    (<div> Nothing</div>)
            }
        </div >
    )
}


export default Note