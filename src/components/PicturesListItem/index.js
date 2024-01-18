import './index.css'

import { useSelector, useDispatch } from 'react-redux';
import { updateIsHovered, nextPage, previousPage } from '../../features/picturesSlice';
import LazyLoad from 'react-lazy-load'

const PicturesListItem = (props) => {
    const { pictureData } = props
    const dispatch = useDispatch()

    const isHoveredOn = useSelector((state) => state.isHovered)
    const {
        id, title, publishedAt,
        coverPhoto } = pictureData
    const date = new Date(publishedAt).toLocaleDateString()
    const { full, raw, regular, small, thumb, small_s3 } = coverPhoto.urls

    const handleMouseEnter = () => {
        dispatch(updateIsHovered(id))
    }

    const handleMouseLeave = () => {
        dispatch(updateIsHovered(0))
    }

    const popup = () => <>
        <div className={isHoveredOn === id ? 'popup-container show-popup' : 'popup-container hide-popup'}>
            <p className='popup-text'><span className='spanned'>Category :</span> <br />{title}</p>
            <p className='popup-text'><span className='spanned'>Description :</span> <br /> This picture is beautiful</p>
            <p className='popup-text'><span className='spanned'>Published On :</span> <br />{date}</p>
        </div>
    </>

    return (
        <li className='picture-list-item' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
            <a href={full} rel="noopener noreferrer" target='_blank'>
                <LazyLoad className='lazy'>
                    <img className='picture' src={regular} alt={title} />
                </LazyLoad>

                {popup()}
            </a>
        </li>

    )
}

export default PicturesListItem