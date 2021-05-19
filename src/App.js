import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { doodleFetch } from "./api/doodleFetch";
import { setDoodles } from './slices/doodleSlice'
import  Loading  from "./components/Loading"
import Nav from "./components/Nav"
import SignUpIn from "./containers/SignUpIn"
import DoodleContainer from './containers/DoodleContainer'
import Pagination from './containers/Pagination'
import NewCanvas from './containers/NewCanvas'

function App() {
  //STATE
  const [showSignUpIn, setShowSignUpIn] = useState(false);
  const totalPages = useSelector(state => state.doodle.totalPages)
  const loading = useSelector(state => state.loading.status)
  const dispatch = useDispatch();
  //MODAL
  const handleClose = () => {
    setShowSignUpIn(false);
  };

  const handleShow = () => {
    setShowSignUpIn(true);
  };

  // There might be some problem with Profile
  // Basically wrap useEffect with if statement
  // based on router location
  useEffect(() => {
    doodleFetch().then((data) => {
        dispatch(setDoodles(data))
    });
  }, []);

  return (
    
    <>
        <Nav
          // getSearchTerm={this.getSearchTerm}
          handleShow={handleShow}
          // handleNewCanvasShow={this.handleNewCanvasShow}
          // navigateProfileHome={this.navigateProfileHome}
        />
        <NewCanvas 
          // user={this.state.currentUser}
          // addNewDoodle={this.addNewDoodle}
          // show={this.state.showNewCanvas}
          // onHide={this.handleNewCanvasClose}
        /> 

        <main>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <>
                  <SignUpIn
                    // handleLogin={handleLogin}
                    onHide={handleClose}
                    show={showSignUpIn}
                  />
                  {loading ? (
                    <Loading />
                  ) : (
                    <>
                      <DoodleContainer
                      />
                      {totalPages <= 1  ? (
                        ""
                      ) : (
                        <Pagination/>
                      )}
                    </>
                  )}
                </>
              )}
            />
            <Route
              path="/profile"
              render={(routeProps) => (
                <>
                  {!this.state.currentUser ? (
                    <Loading />
                  ) : (
                    <>
                      {/* <Profile
                        user={this.state.currentUser}
                        updateLike={this.updateLike}
                        handleNew={this.handleAddNewDoodle}
                        userUpdate={this.userUpdate}
                        userDelete={this.userDelete}
                        renderExisting={this.renderExisting}
                        handleEditCanvasShow={this.handleEditCanvasShow}
                        newDoodle={this.state.newDoodleProfile}
                        updateProfileClicked={this.updateProfileClicked}
                        profileClicked={this.state.profileClicked}
                        // navigateProfileHome={this.navigateProfileHome()}
                        {...routeProps}
                      /> */}
                    </>
                  )}
                </>
              )}
            />
          </Switch>
        </main>
      </>
  );
}

export default App;
