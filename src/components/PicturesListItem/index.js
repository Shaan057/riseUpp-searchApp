import './index.css'


const PicturesListItem = ({ pictureData, onHoverIn, onMouseHoverOut }) => {
    const {
        id, title, description, publishedAt, lastCollectedAt,
        updatedAt, featured, totalPhotos, shareKey, tags,
        links, user, coverPhoto, previewPhotos, likes } = pictureData

    const { full, raw, regular, small, thumb, small_s3 } = coverPhoto.urls

    const handleMouseEnter = () => {
        onHoverIn()
    }
    const handleMouseLeave = () => {
        onMouseHoverOut()
    }
    return (
        <>
            <li className='picture-list-item' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <img className='picture' src={regular} alt={title} />
            </li>
        </>

    )
}

export default PicturesListItem