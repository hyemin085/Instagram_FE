import {FiSettings} from "react-icons/fi";
import "./Profile.scss";
import {followers_modal_check, following_modal_check, modal_check} from "../../../redux/modal/modalSlice";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import pp from "../../../image/profile.jpg";
import UserFollower from "./Follow/UserFollower";
import {React} from "react";
import {profile_setting} from "../../../common/IconImage";


//프로필이 자기일 때 보여주는 화면
const MyProfileInfo = ({userId, name, totalFollow, totalFollower, totalPost, introdution}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const show_postModal = () => {
    dispatch(modal_check());
  };


  const show_following_modal = () => {
    dispatch(following_modal_check());
  };

  const show_followers_modal = () => {
    dispatch(followers_modal_check());
  };

  const editProfileClickHandler = () => {
    navigate("/edituser");
  }
  return(
    <div className="profile_header">
      <div className="profile_header_image">
        <img src={pp} alt={"profile"}/>
      </div>
      <section className="profile_header_main">
        <div className="profile_header_top">
          <span>{userId}</span>
          <span onClick={editProfileClickHandler}>프로필 편집</span>
          <img className="profile_settings" src={profile_setting}  onClick={show_postModal}/>

        </div>
        <ul className="profile_header_mid">
									<span>
										게시물 <span>{totalPost}</span>
									</span>

            <UserFollower totalFollower={totalFollower}/>

          <span
            onClick={show_following_modal}
            className="profile_following_modal"
          >
										팔로우 <span>{totalFollow}</span>
									</span>
        </ul>
        <div className="profile_header_name">{name}</div>
        <div className="profile_header_bottom">{introdution}</div>
      </section>

    </div>

  )
}

export default MyProfileInfo;