import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { Transition } from "react-transition-group";
import DoodleContainer from "./DoodleContainer";
import ProfileEditForm from "./ProfileEditForm";
import DoodleCanvas from "./NewCanvas";
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
                // onClick={this.handleShow}
              >
                edit
              </button>
            </div>
            <p>{currentUser.bio}</p>
            <hr id="line"></hr>
            {/* <ProfileEditForm
              userDelete={this.props.userDelete}
              userUpdate={userUpdate}
              user={user}
              updateUserInfo={this.updateUserInfo}
              show={this.state.showEditForm}
              onHide={this.handleClose}
            /> */}
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

/*
class Profile extends Component {
  state = {
    // showEditForm: false,
    // userDoodles: [],
    showEditCanvas: false,
    currentlyEditing: {},
    page: 1,
    totalPages: null,
    loading: "",
    doodleAdded: false,
  };

  // componentDidMount() {
  //   this.setState({ loading: true });
  //   fetch(`https://doodl-api.herokuapp.com/users/${this.props.user.id}`)
  //     .then((r) => r.json())
  //     .then((data) => {
  //       this.setState({
  //         userDoodles: data.doodles,
  //         totalPages: data.total_pages,
  //       });
  //     });
  //   this.setState({ loading: false });
  //   this.props.updateProfileClicked();
  // }

  // componentDidUpdate(prevProps) {
  //   if (this.props.newDoodle !== prevProps.newDoodle) {
  //     this.addToState(this.props.newDoodle);
  //   }
  //   if (this.props.profileClicked !== prevProps.profileClicked) {
  //     this.setState({ page: 1 });
  //     this.props.updateProfileClicked();
  //   }
  // }

  

  

  //DELETE
  //remove one doodle
  // removeFromState = (id) => {
  //   const filtered = this.state.userDoodles.filter((d) => d.id !== id);

  //   this.setState(
  //     {
  //       userDoodles: filtered,
  //     },
  //     () => {
  //       const currPageDoods = this.state.userDoodles.length % 6;
  //       const currPage = this.state.page;
  //       if (currPageDoods == 0) {
  //         if (currPage === 1) {
  //           this.updatePagination();
  //         } else {
  //           this.handleChangePage(-1);
  //           this.setState((prevState) => {
  //             return { totalPages: prevState.totalPages - 1 };
  //           });
  //         }
  //       }
  //     }
  //   );
  // };

  // //update likes
  // updateLike = (doodle_id) => {
  //   const likeObj = {
  //     user_id: this.props.user.id,
  //     doodle_id: doodle_id,
  //   };
  //   const token = localStorage.getItem("token");
  //   const config = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //     body: JSON.stringify(likeObj),
  //   };

  //   fetch(`https://doodl-api.herokuapp.com/doodles/${doodle_id}/likes`, config)
  //     .then((r) => r.json())
  //     .then((doodle) => this.updateState(doodle));
  // };

  //ADD
  // addToState = (newDoodle) => {
  //   const newDoodles = [newDoodle, ...this.state.userDoodles];
  //   this.setState({
  //     userDoodles: newDoodles,
  //   });
  //   if (this.state.totalPages < Math.ceil(newDoodles.length / 6)) {
  //     this.setState({
  //       totalPages: Math.ceil(newDoodles.length / 6),
  //     });
  //   }
  //   //set state true for new doodle added notification
  //   this.setState({
  //     doodleAdded: true,
  //   });
  //   //set timeout
  //   setTimeout(() => this.setState({ doodleAdded: false }), 3000);
  // };

  // //set state for selected doodle for editing
  // renderExisting = (dood) => {
  //   this.setState({
  //     currentlyEditing: dood,
  //   });
  // };

  // //UPDATE
  // updateState = (updatedDoodle) => {
  //   const updatedDoods = this.state.userDoodles.map((doodle) => {
  //     if (doodle.id === updatedDoodle.id) {
  //       return updatedDoodle;
  //     } else {
  //       return doodle;
  //     }
  //   });
  //   this.setState({
  //     userDoodles: updatedDoods,
  //   });
  // };


  // handleChangePage = (num) => {
  //   if (this.state.page + num >= 1) {
  //     this.setState({ page: this.state.page + num }, () => {
  //       //we only fetch on the right arrow
  //       if (num > 0) {
  //         this.props.updateProfileClicked();
  //         this.updatePagination();
  //       }
  //     });
  //   }
  // };

  // updatePagination = () => {
  //   this.setState({ loading: true });
  //   fetch(
  //     `https://doodl-api.herokuapp.com/users/${this.props.user.id}/?page=${this.state.page}`
  //   )
  //     .then((r) => r.json())
  //     .then((data) => {
  //       //doing the below logic to prevent fetching duplicates as we move back and forth
  //       const combinedDoodles = [...this.state.userDoodles, ...data.doodles];
  //       const uniqueDoodles = Array.from(
  //         new Set(combinedDoodles.map((a) => a.id))
  //       ).map((id) => {
  //         return combinedDoodles.find((a) => a.id === id);
  //       });

  //       this.setState({
  //         userDoodles: uniqueDoodles,
  //         totalPages: data.total_pages,
  //         loading: false,
  //       });
  //     });
  // };

  render() {
    
  }
}

*/
export default Profile;
