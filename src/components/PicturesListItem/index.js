import './index.css'


const PicturesListItem = ({ pictureData }) => {
    const {
        id, title, description, publishedAt, lastCollectedAt,
        updatedAt, featured, totalPhotos, shareKey, tags,
        links, user, coverPhoto, previewPhotos, likes } = pictureData

    const { full, raw, regular, small, thumb, small_s3 } = coverPhoto.urls
    return (
        <li className='picture-list-item'>
            <img className='picture' src={regular} alt={title} />
        </li>
    )
}

export default PicturesListItem