import './index.css'

import { useState } from 'react'


const PicturesListItem = (props) => {
    const [isClicked, setClick] = useState(false)

    const { pictureData, onHoverIn, onMouseHoverOut, isHoveredOn } = props
    const {
        id, title, description, publishedAt, lastCollectedAt,
        updatedAt, featured, totalPhotos, shareKey, tags,
        links, user, coverPhoto, previewPhotos, likes } = pictureData
    const date = new Date(publishedAt).toLocaleDateString()
    const { full, raw, regular, small, thumb, small_s3 } = coverPhoto.urls





    const handleMouseEnter = () => {
        onHoverIn(id)
    }

    const handleMouseLeave = () => {
        onMouseHoverOut(0)
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
            <a href={full} rel="noopener noreferrer">
                <img className='picture' src={regular} alt={title} />
                {popup()}
            </a>
        </li>
    )
}

export default PicturesListItem