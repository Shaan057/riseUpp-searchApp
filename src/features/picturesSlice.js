import { createSlice } from "@reduxjs/toolkit";

const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
}


const initialState = {
    picturesList:null,
    apiStatus: apiStatusConstants.initial
}



export const pictureSlice = createSlice({
    name:"picture",
    initialState,
    reducers:{
        add:(state,action)=>{
            state.picturesList=action.payload
        }
    }
})


export const {add} = pictureSlice.actions

export default pictureSlice.reducer