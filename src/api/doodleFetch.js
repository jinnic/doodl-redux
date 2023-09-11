export const doodleFetch = () => {
    return fetch("/doodles")
      .then((r) => r.json())
  };

export const updateAppPagination = (page, id=0) => {
    return fetch(`/doodles/?page=${page}`)
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
    return fetch("/doodles", config)
      .then((r) => r.json())
  };

export const deleteDoodleFetch =(id)=>{
  const token = localStorage.getItem("token");
  return fetch(`/doodles/${id}`, {
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
  return fetch(`/doodles/${id}`, config)
      .then((r) => r.json())
}

export const updateLikeFetch = (doodleId, userId) => {
  const likeObj = {
    user_id: userId,
    doodle_id: doodleId
  };
  const token = localStorage.getItem("token");
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(likeObj),
  };

  return fetch(`/doodles/${doodleId}/likes`, config)
    .then((r) => r.json())
}