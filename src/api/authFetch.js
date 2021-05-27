export const autoLogin = () => {
    const token = localStorage.getItem("token");
      return fetch(`https://doodl-api.herokuapp.com/auto_login`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
}