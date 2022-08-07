import * as api from '../api';
import { FETCH_ALL, FETCH_POST_BY_ID, FETCH_ALL_BY_SEARCH, DELETE, CREATE, UPDATE, LIKE, START_LOADING, END_LOADING } from '../constants/actionTypes';

export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPosts(page);
        const action = { type: FETCH_ALL, payload: data };
        dispatch(action);
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);
    }
}

export const getPostById = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPostById(id);
        const action = { type: FETCH_POST_BY_ID, payload: data };
        dispatch(action);
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);
        const action = { type: FETCH_POST_BY_ID, payload: null };
        dispatch(action);
        dispatch({ type: END_LOADING });
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPostsBySearch(searchQuery);
        const action = { type: FETCH_ALL_BY_SEARCH, payload: data };
        dispatch(action);
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);
        const action = { type: CREATE, payload: data };
        dispatch(action);
    } catch (error) {
        console.log(error.message);
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);
        const action = { type: UPDATE, payload: data };
        dispatch(action);
    } catch (error) {
        console.log(error.message);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        const action = { type: DELETE, payload: id };
        dispatch(action);
    } catch (error) {
        console.log(error.message);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);
        console.log("Liked dta")
        console.log(data);
        const action = { type: LIKE, payload: data };
        dispatch(action);
    } catch (error) {
        console.log(error.message);
    }
}