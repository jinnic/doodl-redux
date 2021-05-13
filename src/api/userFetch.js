//USER SIGN IN
export const signIn = () => {
    return fetch(`https://doodl-api.herokuapp.com/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({user_name: 'aleksa', password: 'hyojin', bio: ''}),
  })
    .then((resp) => resp.json())
};

//SIGN UP
export const signUp = () => {
  fetch(`https://doodl-api.herokuapp.com/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(this.state),
  })
    .then((resp) => resp.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        this.props.handleLogin(data.user);
        this.props.onHide();
      } else {
        this.setState({ errors: data.error });
      }
    });
};

//USER UPDATE
export const userUpdate = (user, id) => {
  const token = localStorage.getItem("token");

  const config = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(user),
  };
  fetch(`https://doodl-api.herokuapp.com/users/${id}`, config)
    .then((r) => r.json())
    .then((updatedUser) => {
      this.setState(
        {
          currentUser: updatedUser,
        },
        () => console.log("UPDATED USER", updatedUser)
      );
    });
};

