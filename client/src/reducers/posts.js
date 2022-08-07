import { FETCH_ALL, FETCH_POST_BY_ID, FETCH_ALL_BY_SEARCH, CREATE, DELETE, LIKE, UPDATE, START_LOADING, END_LOADING } from "../constants/actionTypes";

export default (state = { post: null, isLoading: true, posts: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };
        case FETCH_POST_BY_ID:
            console.log(action.payload);
            return { ...state, post: action.payload }
        case FETCH_ALL_BY_SEARCH:
            return { ...state, posts: action.payload };
        case CREATE:
            return { ...state, posts: [...state.posts, action.payload] };
        case UPDATE:
        case LIKE:
            return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post) };
        case DELETE:
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
        default:
            return state;
    }
}