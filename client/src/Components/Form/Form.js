import React, { useState, useEffect } from 'react'
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import ChipInput from 'material-ui-chip-input';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';
import { useLocation } from 'react-router-dom';


const Form = ({ currentId, setCurrentId }) => {
	const classes = useStyles();
	const [postData, setPostData] = useState({
		title: '', message: '', tags: [], selectedFile: ''
	});
	const user = JSON.parse(localStorage.getItem('profile'));
	const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null);
	const dispatch = useDispatch();
	const location = useLocation();

	useEffect(() => {
		if (post) setPostData(post);
	}, [post]);


	const handleSubmit = (e) => {
		e.preventDefault();
		if (currentId) {
			dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
		} else {
			console.log(postData)
			dispatch(createPost({ ...postData, name: user?.result?.name, createdAt: Date.now() }));
		}
		clear();
	}
	const clear = () => {
		setCurrentId(null);
		setPostData({
			title: '', message: '', tags: [], selectedFile: ''
		});
	}
	const handleAddTag = (tag) => setPostData({ ...postData, tags: [...postData.tags, tag] });

	const handleDeleteTag = (tag) => setPostData({ ...postData, tags: postData.tags.filter((t) => tag !== t) });

	if (!user?.result?.name) {
		return (
			<Paper className={classes.paper}>
				<Typography variant='h6' align='center'>
					Please sign In to post memories.
				</Typography>
			</Paper>

		)
	}
	return (
		<Paper className={classes.paper} elevation={6}>
			<form autoComplete='off' noValidate className={`${classes.form} ${classes.root}`} onSubmit={handleSubmit}>
				<Typography variant='h6'>{currentId ? 'Updating' : 'Creating'} a memory</Typography>
				<TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
				<TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
				{/* <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => { setPostData({ ...postData, tags: e.target.value.split(',') })}} /> */}
				<ChipInput
					style={{ margin: '10px 0' }}
					value={postData.tags}
					fullWidth
					onAdd={handleAddTag}
					onDelete={handleDeleteTag}
					label="Tags"
					variant='outlined'
				/>
				<div className={classes.fileInput}>
					<FileBase type='file' multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
				</div>
				<Button className={classes.buttonSubmit} variant="contained" color="primary" size='medium' type="large" fullWidth>Submit</Button>
				<Button variant="contained" color="secondary" size='small' onClick={clear} fullWidth>Clear</Button>
			</form>
		</Paper>
	)
}

export default Form;