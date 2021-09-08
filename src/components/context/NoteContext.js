import { createContext, useContext, useReducer } from 'react'

const NoteContext = createContext();

const noteReducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            return {
                notes :[action.payload,...state]
            }

        case 'UPDATE':
            return {
                notes : state.notes.map(note=>{
                    if(note._id === action.payload._id){

                    }
                    return note
                })
            }

        case 'DELETE':
            return {
                notes : state.notes.filter(note=>note._id===action.payload._id)
            }


        default:
            return state

    }
}

let intialState = {
    notes: []
}

export const NoteProvider = ({ children }) => {

    const [state, dispatch] = useReducer(noteReducer, intialState)

    return (
        <>
            <NoteContext.Provider value={{ notes: state.notes,dispatch }}>
                {children}
            </NoteContext.Provider>
        </>)
}

export const useNote = () => {
    return useContext(NoteContext)
}