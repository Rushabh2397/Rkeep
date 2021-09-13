import NewNote from './NewNote'
import NoteListView from './NoteListView'
import { getAllUserNotes, updateUserNote } from '../api'
import { useEffect, useState } from "react";
import { useNote} from '../context/NoteContext'
import {useUser} from '../context/UserContext'
import Navabar from '../navabar/Navbar'
import { Toolbar } from '@material-ui/core';
import GridView from './GridView';
import Loader from '../Loader/Loader'
import Empty from './Empty'

const Note = () => {

    const { noteObj, dispatch } = useNote()
    const {user} = useUser()
    const [loader,setLoader] = useState(false)

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
            setLoader(true)
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
            setLoader(false)
            dispatch({ type: 'GET_ALL_NOTE', payload: res.data.data })
        } catch (error) {
            setLoader(false)
        } 
            

    }

    useEffect(() => {
        getAllNotes();
        return ()=>{
            setLoader(null)
        }
        // eslint-disable-next-line
    }, [])
    return (
        <div>
            <Navabar />
            {user.screen==='Notes' ? <NewNote /> :(<Toolbar/>)}
            {
                user.view === 'List' ?

                (noteObj.notes && noteObj.notes.length > 0
                    ?
                   ( (noteObj.notes.map((note, index) => {
                        return <NoteListView key={index} notz={note} updateNotes={updateNotes} />
                    })))
                    :
                    ( <Empty/>)
                ) :
                (
                    noteObj.notes && noteObj.notes.length > 0 ?   <GridView notz={noteObj.notes} updateNotes={updateNotes}/>:( <Empty/>)
                )
            } 
            <Loader visible={loader}/>
        </div >
    )
}


export default Note