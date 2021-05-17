export const doodleFetch = () => {
    return fetch("https://doodl-api.herokuapp.com/doodles")
      .then((r) => r.json())
  };

export const updatePagination = (page) => {
    return fetch(`https://doodl-api.herokuapp.com/doodles/?page=${page}`)
      .then((r) => r.json())
};