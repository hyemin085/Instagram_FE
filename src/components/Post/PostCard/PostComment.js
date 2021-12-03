import "../PostDetail/PostDetail.scss";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {addComment, addReplyComment} from "../../../redux/post/comment";
import InputEmoji from "react-input-emoji";
import { replyReducer } from '../../../redux/post/commentSlice';

const PostComment = (postId, commentId) => {
	const dispatch = useDispatch();

	// console.log(commentId);
	const replyUserId = useSelector(state => state.comment.replyTag);
	

	const [postComment, SetPostComment] = useState("");
	const [replyComment, SetReplyComment] = useState();
	const AccessToken = localStorage.getItem("user");
	const _postId = postId.postId;

	useEffect(() => {
		dispatch(replyReducer(""))
	}, [])

	useEffect(() => {
		if(replyUserId !== ""){
			SetPostComment("@"+replyUserId);
		}
	}, [replyUserId])
	
	
	function handleOnEnter(postComment) {
		dispatch(
			addComment({
				postId: _postId,
				contents: postComment,
				AccessToken,
			}),
			[dispatch],
		); 
	}

	const CommentClickHandler = (event) => {
		event.preventDefault();
	dispatch(
		addComment({
			postId: _postId,
			contents: postComment,
			AccessToken,
		}),
			[dispatch],
		);

		SetPostComment("")
	};

	// const ReplyCommentClickHandler = () => {
	// 	dispatch(
	// 		addReplyComment({
	// 			postId: _postId,
	// 			commentId: commentId,
	// 			contents: postComment,
	// 			AccessToken,
	// 		}),
	// 			[dispatch],
	// 		);
	
	// 		SetReplyComment("")
	// 	};

	return (
		<>
			<form>
				<div className="postDetail_cmt">
					<InputEmoji
						borderColor="white"
						placeholder="댓글 달기..."
						fontSize="14"
						value={postComment}
						onChange={SetPostComment}
						cleanOnEnter
						onEnter={handleOnEnter}
					/>
					
					{postComment ? (<button className="postDetail_submit"
					onClick={CommentClickHandler} >
						게시
					</button>) : (<button className="postDetail_submitOff"
					onClick={CommentClickHandler} >
						게시
					</button>)}
				</div>
			</form>
		</>
	);
};

export default PostComment;
