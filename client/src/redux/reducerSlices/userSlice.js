import { createSlice } from '@reduxjs/toolkit'

const initialState ={
    _id:'',
    email :'',
    token:'',
    fullName:'',
    isLoggedIn:false,
}
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser :state =>{
     return initialState
    },
    addLoginDetails:(state,action)=>{
      const {token,isLoggedIn}=action.payload
      const {email,fullName,_id}=action.payload.user
      return{
        ...state,
        email:email,
        token:token,
        fullName:fullName,
        isLoggedIn:isLoggedIn,
        _id :_id
      }
    }
  }
})
export const { logoutUser,addLoginDetails } = userSlice.actions

export default userSlice.reducer