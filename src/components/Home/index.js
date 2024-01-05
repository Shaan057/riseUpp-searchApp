import './index.css'
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updatePicturesList, setActiveCategory, setApiStatus } from '../../features/picturesSlice';
import { FaSearch } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid'
import Categories from '../Categories'
import axios from 'axios'

const Home = () => {
    const picturesArray = useSelector((state) => state.picturesList)
    const categoriesArray = useSelector((state) => state.categoriesList)
    const activeCategoryTab = useSelector((state) => state.activeCategory)
    const inputRef = useRef(null)
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(setApiStatus('inProgress'))
                const url = `https://api.unsplash.com/search/collections/?client_id=YtioLfE9uuJXGIolXkEXU9QaIUTmbihEFu_XgS8tXeU&page=1&query=${activeCategoryTab}`
                const response = await axios.get(url)
                console.log(response.data.results)
                dispatch(updatePicturesList(response.data.results))
                dispatch(setApiStatus('success'))
            } catch (error) {
                dispatch(setApiStatus('failure'))
            }
        }
        fetchData()
    }, [activeCategoryTab])

    return (
        <div className='bg-container'>
            <h1 className='riseup-heading'>RiseUpp</h1>
            <div className='input-container'>
                <input
                    placeholder='search-collections'
                    type='text'
                    className='button-input input'
                    ref={inputRef}
                />
                <button className='button-input search-button'><FaSearch /></button>
            </div>
            <br />
            <ul className='category-list'>
                {categoriesArray.map((category) =>
                    <Categories key={uuidv4()} category={category} />
                )}

            </ul>
            <span className='active-category'>{activeCategoryTab}</span>
        </div>
    )
}

export default Home