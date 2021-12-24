// 팔로워 리스트 모달

import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {none_profile} from "../../../common/IconImage"
import {userFollow} from "../../../redux/user/user";
import {useNavigate} from "react-router";

const AskFollowModal = ({askModal, SetAskModal, userId, profileImage, Id, SetIsFollowing, isFollowing}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const askFollowClickHandler = () => {
    dispatch(userFollow({
      Id, isFollowing
    }))
    // SetAskModal(false);
    SetAskModal(false);
  }


  const cancleClickHandler = () => {
    SetAskModal(false);
  };



  return (
    <>
      <div className="small_modal">
        <div className="modal_common_header">
          {/*<span>팔로우</span><span> <img onClick={cancleClickHandler} src={x_img} alt="cancle"/></span>*/}
          {profileImage?  <img src={profileImage} alt="profile_image"/>:  <img src={none_profile} alt="profile_image"/>}

          <div>생각이 바뀌면 {userId}님의 팔로우를 다시 요청할 수 있습니다.</div>

        </div>
        <div className="modal_common_card">
          <div onClick={askFollowClickHandler}>팔로우끊기</div>
        </div>
      </div>
      <div className="overlay" onClick={cancleClickHandler}/>
    </>
  );
};

export default AskFollowModal;