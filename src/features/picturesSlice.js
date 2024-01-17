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
    'Accessories', 'Laptops', 'Watches',
    'Technology', 'Cycle'
]

const initialState = {
    searchInput: '',
    picturesList: null,
    categoriesList: categoriesList,
    activeCategory: categoriesList[0],
    apiStatus: apiStatusConstants.initial,
    isHovered: 0,
    page: 1,
    userDetails: null,
    isAuthenticated: false
}

export const pictureSlice = createSlice({
    name: "picture",
    initialState,
    reducers: {
        updateSearchInput: (state, action) => {
            state.searchInput = action.payload
        },
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
        },

        updateIsHovered: (state, action) => {
            state.isHovered = action.payload
        },
        resetPage: (state) => {
            state.page = 1
        },

        nextPage: (state) => {
            state.page = state.page + 1
        },

        previousPage: (state) => {
            if (state.page > 1) {
                state.page = state.page - 1
            }
        },

        updateUserDetails: (state, action) => {
            state.userDetails = action.payload
        }
        ,
        updateAuthenticationStatus: (state, action) => {
            state.isAuthenticated = action.payload
        }
        ,
        resetAuthDetails: (state) => {
            state.userDetails = null
            state.isAuthenticated = false
        }
    }
})


export const {
    updateSearchInput,
    setActiveCategory,
    updatePicturesList,
    setApiStatus,
    updateIsHovered,
    nextPage,
    previousPage,
    resetPage,
    updateUserDetails,
    updateAuthenticationStatus,
    resetAuthDetails
} = pictureSlice.actions

export default pictureSlice.reducer