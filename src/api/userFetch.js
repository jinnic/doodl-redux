//USER SIGN IN
export const signIn = (data) => {
    return fetch(`https://doodl-api.herokuapp.com/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((resp) => resp.json())
};

//SIGN UP
export const signUp = (data) => {
  return fetch(`https://doodl-api.herokuapp.com/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((resp) => resp.json())
    // .then((data) => {
    //   if (data.token) {
    //     localStorage.setItem("token", data.token);
    //     this.props.handleLogin(data.user);
    //     this.props.onHide();
    //   } else {
    //     this.setState({ errors: data.error });
    //   }
    // });
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
  return fetch(`https://doodl-api.herokuapp.com/users/${id}`, config)
    .then((r) => r.json())
};

//USER DOODLE FETCH
export const userDoodlesFetch = (user) =>{
  return fetch(`https://doodl-api.herokuapp.com/users/${user.id}`)
    .then((r) => r.json())
}

export const updateProfilePagination = (page, id)=>{
  return fetch(
    `https://doodl-api.herokuapp.com/users/${id}/?page=${page}`
  )
    .then((r) => r.json())
}