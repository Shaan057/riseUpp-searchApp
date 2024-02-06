import './index.css'
import { useEffect, useRef } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector, useDispatch } from 'react-redux';
import {
    updateSearchInput, setActiveCategory,
    nextPage, previousPage, resetPage,
    updateUserDetails, updateAuthenticationStatus,
    resetAuthDetails
} from '../../features/picturesSlice';
import { FaSearch, FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid'
import Categories from '../Categories'
import PicturesListItem from '../PicturesListItem';
import { apiStatusConstants } from '../../features/picturesSlice';
import Spinner from '../Spinner'
import { fetchData } from '../actions/actions';
import Header from '../Header';

const Home = () => {
    const { loginWithRedirect,user,isAuthenticated } = useAuth0();
    const picturesArray = useSelector((state) => state.picturesList)
    const categoriesArray = useSelector((state) => state.categoriesList)
    const activeCategoryTab = useSelector((state) => state.activeCategory)
    const getApiStatus = useSelector((state) => state.apiStatus)
    const searchQuery = useSelector((state) => state.searchInput)
    const pageNo = useSelector((state) => state.page)

    const userDetails = useSelector((state) => state.userDetails)
    const authenticatedStatus = useSelector((state) => state.isAuthenticated)

    const inputRef = useRef(null)
    const dispatch = useDispatch()

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    useEffect(() => {
        dispatch(updateUserDetails(user))
        dispatch(updateAuthenticationStatus(isAuthenticated))
    },[user,isAuthenticated])


    useEffect(() => {
        dispatch(fetchData());
    }, [activeCategoryTab, pageNo, isAuthenticated])

    const onEnterInput = (event) => {
        const { key } = event
        if (key === 'Enter') {
            dispatch(setActiveCategory(searchQuery))
            dispatch(resetPage())
        }
    }

    const onChangeInput = (event) => {
        const { value } = event.target
        dispatch(updateSearchInput(value))
    }

    const onSearchButtonClicked = () => {
        dispatch(setActiveCategory(searchQuery))
        dispatch(resetPage())
    }

    const onClickNextPage = () => {
        dispatch(nextPage())
    }
    const onClickPreviousPage = () => {
        dispatch(previousPage())
    }

    const pagination = () => (
        <div className='pagination'>
            <button className='page-button' type='button' onClick={onClickPreviousPage}>
                <FaAngleDoubleLeft />
            </button>
            <span className='page-no'>{pageNo}</span>
            <button className='page-button' type='button' onClick={onClickNextPage}>
                <FaAngleDoubleRight />
            </button>
        </div>
    )

    // console.log(categoriesArray)
    const renderCategoriesList = () => (
        <>
            <ul className='category-list'>
                {categoriesArray.map((category) =>
                    <Categories key={uuidv4()} category={category} />
                )}
            </ul>
        </>
    )

    const noResultsView = () => <div className='no-results-view'>
        <img className='no-results-img' src='https://res.cloudinary.com/dx8csuvrh/image/upload/v1704527044/riseup/no_results_found_rlz8pm.jpg' alt='no-results' />
        <p>No Results Found!</p>
    </div>

    const renderPicturesList = () =>
        picturesArray.length ?
            <>   <ul className='collection-pictures-list'>
                {picturesArray.map((each) =>
                    <PicturesListItem key={uuidv4()} pictureData={each} />
                )}
            </ul>
                {pagination()}
            </>
            : noResultsView()


    const renderFailureView = () => <div className='failure-view'>
        <img className='failure-img' src='https://res.cloudinary.com/dx8csuvrh/image/upload/v1704527966/riseup/something_went_wrong_jng5l5.jpg' alt='failure' />
    </div>


    const signInToContinue = () => {
        return <div className='auth-bg'>
            <h3>You need to be logged in to View Pictures</h3>
            <button className='login-button' onClick={() => { loginWithRedirect() }}>
                SignUp
            </button>
        </div>
    }



    const renderLoadingView = () => <Spinner />

    const renderPictures = () => {
        switch (getApiStatus) {
            case apiStatusConstants.success:
                return renderPicturesList()
            case apiStatusConstants.failure:
                return renderFailureView()
            case apiStatusConstants.inProgress:
                return renderLoadingView()
            default:
                return null
        }
    }

    return (
        <div className='bg-container'>
            <Header />
            <div className='input-container'>
                <input
                    value={searchQuery}
                    placeholder='search-collections'
                    type='text'
                    className='button-input input'
                    ref={inputRef}
                    onChange={onChangeInput}
                    onKeyDown={onEnterInput}
                />
                <button className='button-input search-button' onClick={onSearchButtonClicked}><FaSearch /></button>
            </div>
            <br />
            {renderCategoriesList()}
            <span className='active-category'>{activeCategoryTab}</span>
            {authenticatedStatus ? renderPictures() : signInToContinue()}
        </div>
    )
}

export default Home