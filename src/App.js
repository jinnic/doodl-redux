import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { doodleFetch, updateAppPagination } from "./api/doodleFetch";
import { autoLogin } from "./api/authFetch";
import { setDoodles } from "./slices/doodleSlice";
import { setLoadingTrue, setLoadingFalse } from "./slices/loadingSlice";
import { setUser } from "./slices/userSlice";
import Loading from "./components/Loading";
import Nav from "./components/Nav";
import SignUpIn from "./containers/SignUpIn";
import DoodleContainer from "./containers/DoodleContainer";
import Pagination from "./containers/Pagination";
import Canvas from "./containers/Canvas";
import Profile from "./containers/Profile";
import DoodleCreatedPopUp from "./components/DoodleCreatedPopUp";
import Footer from "./components/Footer";

function App() {
  //STATE
  const [showSignUpIn, setShowSignUpIn] = useState(false);
  const doodles = useSelector((state) => state.doodle.all);
  const totalPages = useSelector((state) => state.doodle.totalPages);
  const loading = useSelector((state) => state.loading.status);
  const currentUser = useSelector((state) => state.user.current);
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
    const token = localStorage.getItem("token");
    dispatch(setLoadingTrue());
    if (token) {
      autoLogin().then((data) => {
        dispatch(setUser(data));
        doodleFetch().then((doodles) => {
          dispatch(setDoodles(doodles));
          dispatch(setLoadingFalse());
        });
      });
    } else {
      doodleFetch().then((data) => {
        dispatch(setDoodles(data));
        dispatch(setLoadingFalse());
      });
    }
  }, []);

  return (
    <>
      <Nav handleShow={handleShow} />
      <Canvas />

      <main>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <>
                <SignUpIn onHide={handleClose} show={showSignUpIn} />
                {loading ? (
                  <Loading />
                ) : (
                  <>
                    <DoodleCreatedPopUp />
                    <DoodleContainer doodles={doodles} />
                    {totalPages <= 1 ? (
                      ""
                    ) : (
                      <Pagination
                        totalPages={totalPages}
                        isProfile={false}
                        updatePagination={updateAppPagination}
                      />
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
                {!currentUser ? (
                  <Loading />
                ) : (
                  <>
                    <Profile />
                  </>
                )}
              </>
            )}
          />
        </Switch>
      </main>
      <Footer/>
    </>
  );
}

export default App;
