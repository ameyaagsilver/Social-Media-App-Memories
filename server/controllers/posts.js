import mongoose from 'mongoose';
import PostMessage from '../models/posts.js'


export const getPosts = async (req, res) => {
    console.log("getting all the posts for you...");

    try{
        const allPosts = await PostMessage.find();

        res.status(200).json(allPosts);
    } catch(error) {
        console.log(error);
        res.status(404).json({message: error.message});
    }
}

export const createPost = async (req, res) => {
    console.log("Creating a post for you...");
    const post = req.body;
    const newPost = PostMessage(post);

    try{
        await newPost.save();

        res.status(200).json(newPost);
    } catch(error) {
        console.log(error);
        res.status(404).json({message: error.message});
    }
}

export const updatePost = async (req, res) => {
    const { id:_id } = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id = ', id);
    try {
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {new: true});
        res.json(updatedPost);
    } catch (error) {
        console.log(error.message);
        res.json(error);
    }

}