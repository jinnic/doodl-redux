export const autoLogin = () => {
    const token = localStorage.getItem("token");
      return fetch(`/auto_login`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
}