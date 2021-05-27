import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DoodleContainer from "./DoodleContainer";
import ProfileEditForm from "./ProfileEditForm";
import Pagination from "./Pagination";
import Loading from "../components/Loading";
import {
  resetPage,
  setUserDoodles,
} from "../slices/doodleSlice";
import { setLoadingTrue, setLoadingFalse } from "../slices/loadingSlice";
import { userDoodlesFetch, updateProfilePagination } from "../api/userFetch";
import DoodleCreatedPopUp from "../components/DoodleCreatedPopUp";

const Profile = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.current);
  const userDoodles = useSelector((state) => state.doodle.user);
  const loading = useSelector((state) => state.loading.status);
  const totalUserPages = useSelector((state) => state.doodle.totalUserPages);
  const [showEditForm, setEditForm] = useState(false);

  const onHide = () => {
    setEditForm(false);
  };

  //fetch user doodl on mount
  useEffect(() => {
    dispatch(setLoadingTrue());
    userDoodlesFetch(currentUser).then((data) => {
      dispatch(setUserDoodles(data));
      dispatch(resetPage());
      dispatch(setLoadingFalse());
    });
  }, []);

  return (
    <div id="profile-page">
      <DoodleCreatedPopUp />

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
            <DoodleContainer doodles={userDoodles} />
            {totalUserPages <= 1 ? (
              ""
            ) : (
              <Pagination
                totalPages={totalUserPages}
                isProfile={true}
                updatePagination={updateProfilePagination}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default Profile;
