import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/userSlice";
import { signIn, signUp } from "../api/userFetch";

const SignUpIn = (props) => {
  const [user_name, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [toggle, setToggle] = useState("log in");
  const [errors, setErrors] = useState([]);
  const userData = { user_name: user_name, password: password, bio: "" };
  const { onHide, show } = props;

  const dispatch = useDispatch();

  const handleChange = (e) => {
    if (e.target.name === "user_name") {
      setUserName(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handleToggle = () => {
    setToggle((prevState) => {
      if (prevState === "sign up") {
        return "log in";
      }
      return "sign up";
    });
  };

  const resetState = () => {
    //reset state
    setUserName("");
    setPassword("");
    setToggle("sign up");
    setErrors([]);
  };

  const handleLogin = () => {
    signIn(userData).then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        // console.log("login user ", data.user)
        dispatch(setUser(data.user));
        resetState();
        onHide();
      } else {
        // console.log(data.failure)
        setErrors(data.failure);
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (toggle === "sign up") {
      handleSignUp();
    } else {
      handleLogin();
    }
  };

  const handleSignUp = () => {
    //API for sign up
    console.log("handle sign up");
    signUp(userData).then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        // console.log("signup user ", data.user)
        dispatch(setUser(data.user));
        resetState();
        onHide();
      } else {
        setErrors(data.error);
      }
    });
  };

  const renderErrors = () => {
    return errors.map((err) => (
      <p style={{ textAlign: "center", fontSize: ".8rem" }}>{err}</p>
    ));
  };
  return (
    <Modal
      show={show}
      onHide={onHide}
      scrollable={false}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      id="signModal"
    >
      <Modal.Header closeButton className="">
        <h5>{toggle === "sign up" ? "Welcome to Doodl" : "Welcome Back"}</h5>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              className="form-control"
              name="user_name"
              value={user_name}
              onChange={handleChange}
              type="text"
              placeholder="username"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              className="form-control"
              name="password"
              value={password}
              onChange={handleChange}
              type="password"
              placeholder="password"
            />
          </div>
          <div style={{ marginBottom: ".5rem" }}>{renderErrors()}</div>
          <button
            id="submitBtn"
            name="signUp"
            className="button mx-auto d-block"
            type="submit"
          >
            {toggle === "sign up" ? "Sign up" : "Log In"}
          </button>
        </form>
        {/* <hr className="hr-text" data-content="or" /> */}
        <div className="or-container">
          <span></span>
          <section>or</section>
          <span></span>
        </div>
        <button
          onClick={handleToggle}
          className="sign-toogle-button mx-auto d-block"
          type="click"
        >
          {toggle !== "sign up" ? "Sign up" : "Log In"}
        </button>
      </Modal.Body>
    </Modal>
  );
};

export default SignUpIn;
