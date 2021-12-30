import {React, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";

import ProfileVideo from "./CommonProfile/ProfileVideo";
import ProfilePosts from "./CommonProfile/ProfilePosts";
import ProfileTagged from "./CommonProfile/ProfileTagged";
import ProfileSaved from "./CommonProfile/ProfileSaved";

// 모달
import ProfileSettingModal from "./CommonProfile/ProfileSettingModal";
import ProfileCollectionModal from './SavedProfile/ProfileCollectionModal';

// scss, icon, img
import "./Profile.scss";
import pp from "../../../image/profile.jpg";
import {FiSettings, FiPlayCircle} from "react-icons/fi";
import {BiBookmark} from "react-icons/bi";
import {RiAccountBoxLine} from "react-icons/ri";
import {MdGridOn} from "react-icons/md";
import ProfileStory from "./ProfileStory";
import MyProfileInfo from "./MyProfileInfo";
import {useLocation, useParams} from "react-router";
import {getUserPost} from "../../../redux/post/post";
import UserProfileInfo from "./UserProfileInfo";


const Profile = () => {

  const dispatch = useDispatch();
  const location = useLocation();

  //개인 데이터 불러오기
  const {id} = useParams();
  const user_id = useParams(id).user_Id;


  //userpost를 가져오면서 본인이 맞는지 아닌지 확인
  const [myProfile, SetMyProfile] = useState(false);
  const get_my_data = sessionStorage.getItem("info");
  const myId = JSON.parse(get_my_data).userId

  useEffect((e) => {
    if (!myProfile) {
      dispatch(getUserPost(user_id));
    }
    if (myId === user_id) {
      SetMyProfile(true);
    } else {
      SetMyProfile(false);
    }
  }, [dispatch, myProfile, location, user_id, myId]);


  const post_list = useSelector(state => state.post.post);


  // 게시물, 동영상, 저장됨, 태그됨
  const [ClickedPosts, setClickedPosts] = useState(true);
  const [ClickedVideo, setClickedVideo] = useState(false);
  const [ClickedSaved, setClickedSaved] = useState(false);
  const [ClickedTagged, setClickedTagged] = useState(false);


  // 게시물, 동영상, 태그됨
  const postsClickHandler = () => {
    setClickedPosts(true);
    setClickedVideo(false);
    setClickedSaved(false);
    setClickedTagged(false);
  };

  const videoClickHandler = () => {
    setClickedVideo(true);
    setClickedPosts(false);
    setClickedSaved(false);
    setClickedTagged(false);
  };

  const savedClickHandler = () => {
    setClickedSaved(true);
    setClickedVideo(false);
    setClickedPosts(false);
    setClickedTagged(false);
  };

  const taggedClickHandler = () => {
    setClickedTagged(true);
    setClickedPosts(false);
    setClickedVideo(false);
    setClickedSaved(false);
  };

  // 프로필 편집, 팔로워, 팔로우 모달
  const is_modal = useSelector((state) => state.modal.is_modal);
  const user_info = useSelector(state => state.post.user);
  const user_data = user_info && user_info[0];
  const my_follow = user_data && user_data.isFollow;




// 저장된 게시물 불러오기
  const savedUser = useSelector((state) => state.post.savedPost);

// 컬렉션 생성
  const [openCollectionModal, setOpenCollectionModal] = useState(false);
  const addCollectionHandler = () => {
    setOpenCollectionModal(true);
  }

  return (
    <>
      {is_modal && <ProfileSettingModal/>}
      {openCollectionModal && <ProfileCollectionModal setOpenCollectionModal={setOpenCollectionModal}/>}


      <div className="profile_all">
        <div className="profile_content">
          <div className="profile_profileBox">
            {myProfile && user_data &&
            <MyProfileInfo
              userId={user_id}
              name={user_data.name}
              totalFollow={user_data.totalFollow}
              totalFollower={user_data.totalFollower}
              totalPost={user_data.totalPost}
              introdution={user_data.introdution}
              profileImage={user_data.profileImage}
            />}
            {!myProfile && user_data &&
            <UserProfileInfo
              userId={user_id}
              Id={user_data._id}
              name={user_data.name}
              totalFollow={user_data.totalFollow}
              totalFollower={user_data.totalFollower}
              totalPost={user_data.totalPost}
              introdution={user_data.introdution}
              profileImage={user_data.profileImage}
              my_follow={my_follow}
            />}
            {/*<ProfileStory/>*/}
            <div className="profile_post_dir" role="tablist">
              {ClickedPosts ? (
                  <a className="profile_post_clicked">
									<span className="profile_post_clickOn"
                        onClick={postsClickHandler}>
											<MdGridOn/> 게시물
									</span>
                  </a>
                )
                : (
                  <a className="profile_post_unclicked">
									<span onClick={postsClickHandler}>
											<MdGridOn/> 게시물
									</span>
                  </a>
                )}


              {ClickedVideo ? (
                <a className="profile_post_clicked">
									<span onClick={videoClickHandler}>
											<FiPlayCircle/> 동영상
									</span>
                </a>
              ) : (
                <a className="profile_post_unclicked">
								<span onClick={videoClickHandler}>
											<FiPlayCircle/> 동영상
									</span>
                </a>
              )}


              {ClickedSaved ? (
                <div className="profile_post_clicked">
									<span onClick={savedClickHandler}>
											<BiBookmark/> 저장됨
									</span>
                </div>
              ) : (
                <a className="profile_post_unclicked">
									<span onClick={savedClickHandler}>
											<BiBookmark/> 저장됨
									</span>
                </a>
              )}
              {ClickedTagged ? (
                <a className="profile_post_clicked">
									<span onClick={taggedClickHandler}>
											<RiAccountBoxLine/> 태그됨
									</span>
                </a>
              ) : (
                <a className="profile_post_unclicked">
									<span onClick={taggedClickHandler}>
											<RiAccountBoxLine/> 태그됨
									</span>
                </a>
              )}
            </div>
            <div className="post_layout">
              {ClickedSaved && (
                <div className="savedPostBox">
                  <div className="desc_savedPost">저장한 내용은 회원님만 볼 수 있습니다</div>
                  <div className="add_savedPostBox" onClick={addCollectionHandler}>+ 새 컬렉션</div>
                </div>

              )}
              {ClickedPosts && (
                <div className="OtherProfile_postsBox">
                  {post_list && post_list.map((img) => (
                    <Link to={`/postdetail/${img._id}`}>
                      <ProfilePosts
                        picture={img.imageUrl}
                        userId={img._id}/>
                    </Link>
                  ))}
                </div>
              )}
              {ClickedSaved && (
                <div className="OtherProfile_savedBox">
                  {savedUser && savedUser.map((save) => (
                    <Link to={`/postdetail/${save._id}`}>
                      <ProfileSaved
                        savedPost={save.imageUrl}
                        userId={save._id}/>
                    </Link>
                  ))}
                </div>
              )}
              {ClickedVideo && (
                <div className="OtherProfile_postsBox">
                  <ProfileVideo/>
                </div>
              )}
            </div>

            {/*{saved && (*/}
            {/*  <div className="OtherProfile_postsBox">*/}
            {/*    <ProfileSaved/>*/}
            {/*  </div>*/}
            {/*)}*/}
            {/*{tagged && (*/}
            {/*  <div className="OtherProfile_postsBox">*/}
            {/*    <ProfileTagged/>*/}
            {/*  </div>*/}
            {/*)}*/}
          </div>
        </div>
      </div>
    </>

  );
};

export default Profile;
