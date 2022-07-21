import * as api from '../api';
import { FETCH_ALL, DELETE, CREATE, UPDATE, LIKE } from '../contants/actionTypes';

export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        const action = {type: FETCH_ALL, payload: data};
        dispatch(action);
    } catch (error) {
        console.log(error.message);
    }    
}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);
        const action = {type: CREATE, payload: data};
        dispatch(action);
    } catch (error) {
        console.log(error.message);
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);
        const action = {type: UPDATE, payload: data};
        dispatch(action);
    } catch (error) {
        console.log(error.message);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        const action = {type: DELETE, payload: id};
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
        const action = {type: LIKE, payload: data};
        dispatch(action);
    } catch (error) {
        console.log(error.message);
    }
}