import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { userUpdate } from '../api/userFetch'
import { setUser } from '../slices/userSlice'
import { useDispatch } from "react-redux";

const ProfileEditForm = ({ user, show, onHide }) => {
  const [user_name, setUsername] = useState(user.user_name);
  const [password, setPassword] = useState(user.password);
  const [bio, setBio] = useState(user.bio);

  const dispatch = useDispatch()

  useEffect(() => {
    setUsername(user.user_name);
    setPassword(user.password);
    setBio(user.bio);
  }, [user.user_name, user.password, user.bio]);

  const handleChange = (e) => {
    if (e.target.name === "user_name") {
      setUsername(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    } else if (e.target.name === "bio") {
      setBio(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userObj = {
      user_name: user_name,
      password: password,
      bio: bio,
    };
    userUpdate(userObj, user.id)
    .then((updatedUser) => {
        dispatch(setUser(updatedUser))
    })
    onHide()
  };

    return (
      <Modal
        show={show}
        onHide={onHide}
        scrollable={false}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        id="profileModal"
      >
        <Modal.Header closeButton className="">
          <h5 className="modal-title" id="profileModalLabel">
            Edit {user.user_name}'s profile
          </h5>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <label>Username:</label>
            <input
              className="form-control"
              name="user_name"
              value={user_name}
              onChange={handleChange}
              type="text"
            />
            <label>Password:</label>
            <input
              className="form-control"
              name="password"
              value={password}
              onChange={handleChange}
              type="password"
              required
            />
            <label>Bio:</label>
            <input
              className="form-control"
              name="bio"
              value={bio}
              onChange={handleChange}
              type="text"
            />
          </Modal.Body>
          <Modal.Footer>
            <button className="button" type="submit">
              Update
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    );
};

// class ProfileEditForm extends Component {
  //   state = {
  //     user_name: this.props.user.user_name,
  //     password: this.props.user.password,
  //     bio: this.props.user.bio,
  //   };

  //   componentDidUpdate(prevProps) {
  //     if (this.props.user !== prevProps.user) {
  //       this.setState({
  //         user_name: this.props.user.user_name,
  //         password: this.props.user.password,
  //         bio: this.props.user.bio,
  //       });
  //     }
  //   }

//   handleChange = (e) => {
//     this.setState(
//       {
//         [e.target.name]: e.target.value,
//       },
//       () => console.log(this.state)
//     );
//   };

//   handleSubmit = (e) => {
//     e.preventDefault();

//     const userObj = {
//       user_name: this.state.user_name,
//       password: this.state.password,
//       bio: this.state.bio,
//     };
//     this.props.userUpdate(userObj, this.props.user.id);
//     this.props.onHide();
//   };

//   render() {
//     const { onHide, show } = this.props;
//     return (
//       <Modal
//         show={show}
//         onHide={onHide}
//         scrollable={false}
//         size="md"
//         aria-labelledby="contained-modal-title-vcenter"
//         centered
//         id="profileModal"
//       >
//         <Modal.Header closeButton className="">
//           <h5 className="modal-title" id="profileModalLabel">
//             Edit {this.props.user.user_name}'s profile
//           </h5>
//         </Modal.Header>
//         <form onSubmit={this.handleSubmit}>
//           <Modal.Body>
//             <label>Username:</label>
//             <input
//               className="form-control"
//               name="user_name"
//               value={this.state.user_name}
//               onChange={this.handleChange}
//               type="text"
//             />
//             <label>Password:</label>
//             <input
//               className="form-control"
//               name="password"
//               value={this.state.password}
//               onChange={this.handleChange}
//               type="password"
//               required
//             />
//             <label>Bio:</label>
//             <input
//               className="form-control"
//               name="bio"
//               value={this.state.bio}
//               onChange={this.handleChange}
//               type="text"
//             />
//           </Modal.Body>
//           <Modal.Footer>
//             <button className="button" type="submit">
//               Update
//             </button>
//           </Modal.Footer>
//         </form>
//       </Modal>
//     );
//   }
// }
export default ProfileEditForm;
