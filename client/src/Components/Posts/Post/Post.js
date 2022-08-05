import React from 'react'
import { useDispatch } from 'react-redux';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Grow } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';

import useStyles from './styles';
import { deletePost, likePost } from '../../../actions/posts';

const Post = ({ post, setCurrentId }) => {
	const classes = useStyles();
	const user = JSON.parse(localStorage.getItem('profile'));
	const dispatch = useDispatch();
	const handleDelete = (id) => {
		dispatch(deletePost(id));
	}
	const handleLike = (id) => {
		dispatch(likePost(id));
	}
	const Likes = () => {
		if (post.likes.length > 0) {
			return post.likes.find((like) => like === (user?.result?._id || user?.result?.sub))
				? (
					<><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}</>
				) : (
					<><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
				);
		}

		return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
	};


	return (
		<Grow in>
			<Card className={classes.card}>
				<CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
				<div className={classes.overlay} >
					<Typography variant='h6'>{post.name}</Typography>
					<Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
				</div>
				<div className={classes.overlay2}>

					{(user?.result?._id === post?.creator || user?.result?.sub === post?.creator) ?
						<Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}>
							<MoreHorizIcon fontSize='medium' />
						</Button>
						: null}
				</div>
				<div className={classes.details}>
					<Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
				</div>
				<Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
				<CardContent>
					<Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
				</CardContent>
				<CardActions className={classes.cardActions}>
					<Button size="small" color="primary" disabled={!user?.result} onClick={() => { handleLike(post._id) }}>
						<Likes />
					</Button>
					{(user?.result?._id === post?.creator || user?.result?.sub === post?.creator) ?
						<Button size="small" color="primary" onClick={() => { handleDelete(post._id) }}><DeleteIcon fontSize="small" /> Delete</Button>
						: null}

				</CardActions>

			</Card>
		</Grow>
	)
}

export default Post;