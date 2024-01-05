import { createSlice } from "@reduxjs/toolkit";

export const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
}

const categoriesList = [
    'Mountains', 'Flowers', 'Cities',
    'Beaches', 'Fruits', 'Animals',
    'Cars', 'Bikes', 'Mobiles',
    'Accessories', 'Laptops', 'Watches', 'Computer', 'Technology'
]

const initialState = {
    picturesList: null,
    categoriesList: categoriesList,
    activeCategory: categoriesList[0],
    apiStatus: apiStatusConstants.initial
}

export const pictureSlice = createSlice({
    name: "picture",
    initialState,
    reducers: {
        setActiveCategory: (state, action) => {
            state.activeCategory = action.payload
        },
        updatePicturesList: (state, action) => {
            state.picturesList = action.payload
        },
        setApiStatus: (state, action) => {
            switch (action.payload) {
                case apiStatusConstants.inProgress:
                    state.apiStatus = apiStatusConstants.inProgress
                    break;
                case apiStatusConstants.success:
                    state.apiStatus = apiStatusConstants.success
                    break;
                case apiStatusConstants.failure:
                    state.apiStatus = apiStatusConstants.failure
                    break;
                default:
                    state.apiStatus = apiStatusConstants.initial
            }

        }
    }
})


export const { setActiveCategory, updatePicturesList, setApiStatus } = pictureSlice.actions

export default pictureSlice.reducer