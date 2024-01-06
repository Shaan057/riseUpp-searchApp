import './index.css'
import { useSelector, useDispatch } from 'react-redux';
import { setActiveCategory, resetPage } from '../../features/picturesSlice';

const Categories = ({ category }) => {
    const dispatch = useDispatch()

    const updateActiveTab = (tab) => {
        dispatch(setActiveCategory(tab))
        dispatch(resetPage())
    }

    const setActiveTab = () => {
        updateActiveTab(category)
    }
    const activeCategoryTab = useSelector((state) => state.activeCategory)

    const isActiveTab = activeCategoryTab === category
    const classStyle = isActiveTab ? 'category-button active-category-tab' : 'category-button'

    return (
        <li className='category-list-item'>
            <button className={classStyle} type='button' onClick={setActiveTab}>{category}</button>
        </li>
    )
}

export default Categories