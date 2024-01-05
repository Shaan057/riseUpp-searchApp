import './index.css'

const Categories = ({ category }) => {
    return (
        <li className='category-list-item'>
            <button className='category-button' type='button'>{category}</button>
        </li>
    )
}

export default Categories