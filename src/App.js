import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser, clearUser } from "./slices/userSlice";
import { signIn, signUp, userUpdate } from "./api/userFetch";

function App() {
  const user = useSelector((state) => state.user.current);
  const dispatch = useDispatch();
  console.log(user);

  const handleLogin = () => {
    // fetch(`https://doodl-api.herokuapp.com/login`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Accept": "application/json",
    //   },
    //   body: JSON.stringify({
    //     user_name: "aleksa",
    //     password: "hyojin",
    //     bio: ""
    //   }),
    // })
    // .then((resp) => resp.json())
    signIn().then((data) => {
      console.log(data)
    });
  };

  return (
    <div className="App">
      <button onClick={handleLogin}>set user</button>
      <button onClick={() => dispatch(clearUser())}>clear user</button>
      <div>{user}</div>
    </div>
  );
}

export default App;
