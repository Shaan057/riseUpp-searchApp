import './index.css'
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateSearchInput, updatePicturesList, setActiveCategory, setApiStatus, nextPage, previousPage } from '../../features/picturesSlice';
import { FaSearch, FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid'
import Categories from '../Categories'
import axios from 'axios'
import PicturesListItem from '../PicturesListItem';
import { apiStatusConstants } from '../../features/picturesSlice';
import Spinner from '../Spinner'

const Home = () => {

    const picturesArray = useSelector((state) => state.picturesList)
    const categoriesArray = useSelector((state) => state.categoriesList)
    const activeCategoryTab = useSelector((state) => state.activeCategory)
    const getApiStatus = useSelector((state) => state.apiStatus)
    const searchQuery = useSelector((state) => state.searchInput)
    const pageNo = useSelector((state) => state.page)

    const inputRef = useRef(null)
    const dispatch = useDispatch()
    // console.log(picturesArray)
    // console.log(activeCategoryTab)

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    const convertToPascalCase = (data) => {
        return {
            id: data.id,
            title: data.title,
            description: data.description,
            publishedAt: data.published_at,
            lastCollectedAt: data.last_collected_at,
            updatedAt: data.updated_at,
            featured: data.featured,
            totalPhotos: data.total_photos,
            private: data.private,
            shareKey: data.share_key,
            tags: data.tags,
            links: data.links,
            user: data.user,
            coverPhoto: data.cover_photo,
            previewPhotos: data.preview_photos.map((e) => ({
                id: e.id,
                createdAt: e.created_at,
                updatedAt: e.updated_at,
                blurHash: e.blur_hash,
                urls: e.urls
            }))
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(setApiStatus('IN_PROGRESS'))
                const url = `https://api.unsplash.com/search/collections/?client_id=YtioLfE9uuJXGIolXkEXU9QaIUTmbihEFu_XgS8tXeU&page=${pageNo}&query=${activeCategoryTab}`
                const response = await axios.get(url)
                // console.log(response.data.results)
                const formattedData = response.data.results.map((each) => convertToPascalCase(each))
                dispatch(updatePicturesList(formattedData))
                dispatch(setApiStatus('SUCCESS'))
            } catch (error) {
                dispatch(setApiStatus('FAILURE'))
            }
        }
        fetchData()
    }, [activeCategoryTab,pageNo])

    const onEnterInput = (event) => {
        const { key } = event
        const { value } = event.target
        if (key === 'Enter') {
            dispatch(setActiveCategory(searchQuery))
        }
    }

    const onChangeInput = (event) => {
        const { value } = event.target
        dispatch(updateSearchInput(value))
    }

    const onSearchButtonClicked = () => {
        dispatch(setActiveCategory(searchQuery))
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
            <h1 className='riseup-heading'>RiseUpp</h1>
            <div className='input-container'>
                <input
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
            {renderPictures()}
        </div>
    )
}

export default Home