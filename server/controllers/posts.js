import mongoose from 'mongoose';
import PostMessage from '../models/posts.js'


export const getPosts = async (req, res) => {
    console.log("getting all the posts for you...");

    try {
        const allPosts = await PostMessage.find();

        res.status(200).json(allPosts);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    console.log("Creating a post for you...");
    const post = req.body;
    if(!req?.userId) res.status(400).json({message: "U r not logged in..."})
    const newPost = PostMessage({ ...post, creator: req?.userId });

    try {
        await newPost.save();

        res.status(200).json(newPost);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
    try {
        const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
        res.json(updatedPost);
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
    try {
        const post = await PostMessage.findByIdAndRemove(id);
        console.log("Deleting the post...");
        console.log(post);
        res.json({ message: 'Post deleted successfully...' });
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) res.json({ message: "User is not authenticated..." });

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('Cannot like a post which does not exist');
    try {
        const oldPost = await PostMessage.findById(id);

        const index = oldPost.likes.findIndex((id) => id === String(req.userId));

        if (index == -1) {
            oldPost.likes.push(req.userId);
        } else {
            oldPost.likes = oldPost.likes.filter((userid) => userid !== String(req.userId));
        }

        const updatedPost = await PostMessage.findByIdAndUpdate(id, oldPost, { new: true });
        res.json(updatedPost);
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}