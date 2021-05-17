import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser, clearUser } from "./slices/userSlice";
import { signIn, signUp, userUpdate } from "./api/userFetch";
import  Loading  from "./components/Loading"
import Nav from "./components/Nav"
import SignUpIn from "./containers/SignUpIn"
import DoodleContainer from './containers/DoodleContainer'
import Pagination from './containers/Pagination'


function App() {
  //STATE
  const [showSignUpIn, setShowSignUpIn] = useState(false);
  const [loading, setLoading] = useState(false)
  const totalPages = useSelector(state => state.doodle.totalPages)

  //MODAL
  const handleClose = () => {
    setShowSignUpIn(false);
  };

  const handleShow = () => {
    setShowSignUpIn(true);
  };

  return (
    
    <>
        <Nav
          // getSearchTerm={this.getSearchTerm}
          // currentUser={this.state.currentUser}
          // handleLogout={handleLogout}
          handleShow={handleShow}
          // handleNewCanvasShow={this.handleNewCanvasShow}
          // doodleFetch={this.doodleFetch}
          // navigateProfileHome={this.navigateProfileHome}
        />
        {/* <NewCanvas
          user={this.state.currentUser}
          addNewDoodle={this.addNewDoodle}
          show={this.state.showNewCanvas}
          onHide={this.handleNewCanvasClose}
        /> */}

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
