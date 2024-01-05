import './index.css'

const Categories = ({ category, updateActiveTab, activeCategoryTab }) => {

    const setActiveTab = () => {
        updateActiveTab(category)
    }
    const isActiveTab = activeCategoryTab === category
    const classStyle = isActiveTab ? 'category-button active-category-tab' : 'category-button'

    return (
        <li className='category-list-item'>
            <button className={classStyle} type='button' onClick={setActiveTab}>{category}</button>
        </li>
    )
}

export default Categories