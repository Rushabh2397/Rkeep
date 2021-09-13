import { createContext, useContext, useReducer } from 'react'

const UserContext = createContext();

const userReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            let user = JSON.parse(localStorage.getItem('notzzUser') )
            return {
                name: action.payload.name,
                email : action.payload.email,
                token : action.payload.token,
                screen : user ? user.screen : 'Notes',
                view: user ? user.view : 'List'
            };

        case 'SIGNUP':
            return {
                name: action.payload.name,
                email : action.payload.email,
                token : action.payload.token,
                screen : 'Notes',
                view: 'List'
            };    

        case 'LOGOUT':
            return {
                name: '',
                email : '',
                token : ''
            }
         
        case 'USER_PREFERENCE' :
            
            return {
                ...state,
                screen : action.payload.screen ? action.payload.screen : state.screen,
                view: action.payload.view ? action.payload.view : state.view
            }


        default:
            return state

    }
}

let intialState = {
    name : '',
    email : '',
    token : '',
    screen: 'Notes',
    view : 'List'
}

export const UserProvider = ({ children }) => {
    let user = JSON.parse(localStorage.getItem('notzzUser') ) || { name : '',email : '',token : ''}
    if(user.token){
        intialState.name= user.name
        intialState.email= user.email
        intialState.token= user.token
        intialState.screen = user.screen
        intialState.view = user.view
    }
    const [state, userDispatch] = useReducer(userReducer, intialState)

    return (
        <>
            <UserContext.Provider value={{ user:state,userDispatch }}>
                {children}
            </UserContext.Provider>
        </>)
}

export const useUser = () => {
    return useContext(UserContext)
}