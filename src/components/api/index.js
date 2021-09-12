import axios from 'axios'

export const addUserNote = (data)=>{
    return axios.post(`${process.env.REACT_APP_BACKEND}user/api/add_note`,data)
}

export const getAllUserNotes = (data)=>{
    return axios.post(`${process.env.REACT_APP_BACKEND}user/api/get_all_notes`,data)
}

export const deleteUserNote = (data)=>{
    return axios.post(`${process.env.REACT_APP_BACKEND}user/api/delete_note`,data)
}

export const updateUserNote = (data)=>{
    return axios.put(`${process.env.REACT_APP_BACKEND}user/api/update_note`,data)
}

export const userSignup = (data)=>{
    return axios.post(`${process.env.REACT_APP_BACKEND}user/auth/register`,data)
}

export const userLogin = (data)=>{
    return axios.post(`${process.env.REACT_APP_BACKEND}user/auth/login`,data)
}