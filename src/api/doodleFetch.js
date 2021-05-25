export const doodleFetch = () => {
    return fetch("https://doodl-api.herokuapp.com/doodles")
      .then((r) => r.json())
  };

export const updateAppPagination = (page, id=0) => {
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

export const deleteDoodleFetch =(id)=>{
  const token = localStorage.getItem("token");
  return fetch(`https://doodl-api.herokuapp.com/doodles/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((r) => r.json())
}


export const updateDoodleFetch =(doodle, id)=>{
  const token = localStorage.getItem("token");
  const config = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(doodle),
  };
  return fetch(`https://doodl-api.herokuapp.com/doodles/${id}`, config)
      .then((r) => r.json())
}