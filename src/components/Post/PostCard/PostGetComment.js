import React, {useState} from "react";
import { useDispatch } from 'react-redux';
import {comment_heart, comment_red_heart} from "../../../common/IconImage";
import { likedComment } from '../../../redux/post/comment';

//postcard와 css공유함.
import "./PostCard";


const PostGetComment = ({contents, writer, postId, commentId, isLike}) => {
  const dispatch = useDispatch();

  // userId 추출
  const userId = writer[0] ?
    (writer[0].userId) :
    (writer.userId);

  // const userInfo = sessionStorage.getItem("info");
  // const userData = JSON.parse(userInfo);
  // const userId = userData.userId;

  // 댓글 좋아요
  const AccessToken = localStorage.getItem("user");
  const path = "mainCmt";
  const commentLikeClickHandler = () => {
    dispatch(
      likedComment({
        commentId,
        AccessToken,
        path,
        postId,
      }));
  };
  return( 
    <>
      <div className="post_comment">
        <div className="post_one_comment">
          <div> <a>{userId}</a>  <a>{contents}</a> </div>
          {isLike ? (
              <img src={comment_red_heart} onClick={commentLikeClickHandler}/>) :
            (<img src={comment_heart} onClick={commentLikeClickHandler}/>)}
        </div>
      </div>
    </>
  )
}

export default PostGetComment;