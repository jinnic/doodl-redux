import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { Transition } from "react-transition-group";
import DoodleContainer from "./DoodleContainer";
import ProfileEditForm from "./ProfileEditForm";
import Pagination from "./Pagination";
import Loading from "../components/Loading";
import { setProfileFormTrue } from "../slices/modalSlice";
import { resetPage, deleteDoodle, updateDoodle, setUserDoodles} from "../slices/doodleSlice"
import { setLoadingTrue, setLoadingFalse } from "../slices/loadingSlice"
import { userDoodlesFetch, updateProfilePagination} from "../api/userFetch"
import { deleteDoodleFetch, updateDoodleFetch } from "../api/doodleFetch"

const Profile = () => {
  const dispatch = useDispatch(); 
  const currentUser = useSelector(state => state.user.current)
  const userDoodles = useSelector(state => state.doodle.user)
  const loading = useSelector(state => state.loading.status)
  const totalUserPages = useSelector(state => state.doodle.totalUserPages)

  const [showEditForm, setEditForm] = useState(false);

  const onHide = () => {
    setEditForm(false)
  }


  //fetch user doodl on mount
  useEffect(() => {
    dispatch(setLoadingTrue())
    userDoodlesFetch(currentUser).then((data) => {
        dispatch(setUserDoodles(data))
        dispatch(resetPage())
        dispatch(setLoadingFalse())
    });
  }, []);

  //HANDLE DELETE
  const handleDelete = (id) => {
    deleteDoodleFetch(id).then((data)=>dispatch(deleteDoodle(data.id)));
  };

  //HANDLE UPDATE
  const handleUpdate = (doodle, id) => {
    updateDoodleFetch(doodle, id)
      .then((data) => {dispatch(updateDoodle(data))});
  };
  
  // const sliceStart = (this.state.page - 1) * 6;
  // const sliceEnd = sliceStart + 6;

  const duration = 500;

  const defaultStyle = {
    transition: `opacity ${duration}ms ease`,
    opacity: 0
  };

  const transitionStyles = {
    entering: { opacity: 0, display: `inline-block` },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0, display: `none` },
  };
    return (
      <div id="profile-page">
        {/* <Transition in={this.state.doodleAdded} timeout={500}>
          {state => (
        <div class="doodle-added-notif" style={{
        ...defaultStyle,
        ...transitionStyles[state]
      }}>
       Doodl created!
      </div> )}
      </Transition> */}
      
        <div>
          <div id="profile-info-container">
            <div id="profile-edit-container">
              <h2>{currentUser.user_name}'s artwork</h2>
              <button
                type="button"
                className="profile-button"
                onClick={() => setEditForm(true)}
              >
                edit
              </button>
            </div>
            <p>{currentUser.bio}</p>
            <hr id="line"></hr>
            <ProfileEditForm
              user={currentUser}
              show={showEditForm}
              onHide={onHide}
            />
          </div>
          {loading ? (
            <Loading />
          ) : (
            <>
              <DoodleContainer
                doodles={userDoodles}
              />
              {totalUserPages <= 1 ? (
                ""
              ) : (
                <Pagination totalPages={totalUserPages} isProfile={true} updatePagination={updateProfilePagination}/>
              )}
            </>
          )}
        </div>
        {/* <DoodleCanvas
          user={user}
          handleUpdate={this.handleUpdate}
          doodle={this.state.currentlyEditing}
          show={this.state.showEditCanvas}
          onHide={this.handleEditCanvasClose}
        /> */}
      </div>
    );
}
export default Profile;
