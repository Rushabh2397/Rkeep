import { createContext, useContext, useReducer } from 'react'

const NoteContext = createContext();

const noteReducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            return {
                notes :[action.payload,...state.notes],
                noteCount : state.noteCount + 1
            };

        case 'GET_ALL_NOTE':
            return {
                notes : action.payload.notes,
                noteCount : action.payload.noteCount
            };    

        case 'UPDATE':
            return {
                notes : state.notes.map(note=>{
                    if(note._id === action.payload._id){
                       note.note= action.payload.note ? action.payload.note : note.note
                       note.title = action.payload.title ? action.payload.title : note.title
                       note.color = action.payload.color ? action.payload.color : note.color
                       note.is_archived = action.payload.is_archived  ? action.payload.is_archived : note.is_archived
                    }
                    return note
                }),
                noteCount : state.noteCount
            }

        case 'DELETE':
            return {
                notes : state.notes.filter(note=>note._id!==action.payload),
                noteCount : state.noteCount -1
            }


        default:
            return state

    }
}

let intialState = {
    notes: [],
    noteCout : 0
}

export const NoteProvider = ({ children }) => {

    const [state, dispatch] = useReducer(noteReducer, intialState)

    return (
        <>
            <NoteContext.Provider value={{ noteObj:state,dispatch }}>
                {children}
            </NoteContext.Provider>
        </>)
}

export const useNote = () => {
    return useContext(NoteContext)
}