import { createContext, useContext, useReducer } from 'react'

const UserContext = createContext();

const userReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            console.log("paylod Add",action.payload)
            return {
                name: action.payload.name,
                email : action.payload.email,
                token : action.payload.token
            };

        case 'SIGNUP':
            console.log("GET_ALL_NOTE",action.payload)
            return {
                name: action.payload.name,
                email : action.payload.email,
                token : action.payload.token
            };    

        case 'LOGOUT':
            return {
                name: '',
                email : '',
                token : ''
            }



        default:
            console.log("paylod default",action.payload)
            return state

    }
}

let intialState = {
    name : '',
    email : '',
    token : ''
}

export const UserProvider = ({ children }) => {
    let user = JSON.parse(localStorage.getItem('notzzUser') ) || { name : '',email : '',token : ''}
    console.log("user",user)
    if(user.token){
        intialState.name= user.name
        intialState.email= user.email
        intialState.token= user.token
    }
    const [state, dispatch] = useReducer(userReducer, intialState)

    return (
        <>
            <UserContext.Provider value={{ user:state,dispatch }}>
                {children}
            </UserContext.Provider>
        </>)
}

export const useUser = () => {
    return useContext(UserContext)
}