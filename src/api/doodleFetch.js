export const doodleFetch = () => {
    return fetch("https://doodl-api.herokuapp.com/doodles")
      .then((r) => r.json())
  };

export const updatePagination = (page) => {
    return fetch(`https://doodl-api.herokuapp.com/doodles/?page=${page}`)
      .then((r) => r.json())
};

export const addNewDoodle = (doodle) => {
    console.log(JSON.stringify(doodle))
    const token = localStorage.getItem("token");
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(doodle),
    };
    return fetch("https://doodl-api.herokuapp.com/doodles", config)
      .then((r) => r.json())
  };
