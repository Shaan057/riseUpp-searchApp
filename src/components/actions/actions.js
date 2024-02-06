import { updatePicturesList, setApiStatus } from '../../features/picturesSlice';
import axios from "axios";

export const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
}

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


export const fetchData = () => {
    return async (dispatch, getState) => {
        const { page, activeCategory, isAuthenticated } = getState()
        try {
            if (!isAuthenticated) {
                throw new Error('Unauthenticated User')
            }
            dispatch(setApiStatus(apiStatusConstants.inProgress))
            const url = `https://api.unsplash.com/search/collections/?client_id=YtioLfE9uuJXGIolXkEXU9QaIUTmbihEFu_XgS8tXeU&page=${page}&query=${activeCategory}`
            const response = await axios.get(url)
            // console.log(response.data.results)
            const formattedData = response.data.results.map((each) => convertToPascalCase(each))
            dispatch(updatePicturesList(formattedData))
            dispatch(setApiStatus(apiStatusConstants.success))
        } catch (error) {
            dispatch(setApiStatus(apiStatusConstants.failure))
            console.log(error.message)
        }
    };
};
