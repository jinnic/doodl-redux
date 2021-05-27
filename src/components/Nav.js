import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { doodleFetch } from "../api/doodleFetch";
import { userDoodlesFetch } from "../api/userFetch"
import { clearUser } from "../slices/userSlice"
import { setLoadingFalse , setLoadingTrue} from "../slices/loadingSlice";
import { setDoodles, setUserDoodles, resetPage, clearUserDoodles } from "../slices/doodleSlice"
import { setCanvasTrue } from "../slices/modalSlice"
import { ReactComponent as Logo } from './doodl-logo.svg';

const Nav = (props) =>{
  const {handleShow} = props
  const currentUser = useSelector((state) => state.user.current);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearUser())
    dispatch(clearUserDoodles())
    localStorage.removeItem("token");
  }

  const goHomePage = () =>{
    dispatch(setLoadingTrue())
    doodleFetch().then(data => {
      dispatch(setDoodles(data))
      dispatch(resetPage())
      dispatch(setLoadingFalse())
    })
  }

  const goProfilePage = () =>{
    dispatch(setLoadingTrue())
    userDoodlesFetch(currentUser).then(data => {
      dispatch(setUserDoodles(data))
      dispatch(resetPage())
      dispatch(setLoadingFalse())
    })
  }
  return (
    <nav className="navbar fixed-top navbar-expand-md justify-content-center">
    <Link to='/' onClick={goHomePage} className="navbar-brand d-flex w-50 mr-auto"><Logo className='logo'/></Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsingNavbar">
       <span className="navbar-toggler-icon">MENU</span>
     </button>
    <div className="navbar-collapse collapse w-100" id="collapsingNavbar">

      {!currentUser ? 
       <ul className="nav navbar-nav ml-auto w-100 justify-content-end">
           <li className="nav-item">
             <button className='nav-link' onClick={handleShow}>Log In | Sign Up</button>
           </li>
       </ul>
      :  
        <> 
         <ul className="navbar-nav w-100 justify-content-center">
           {/* <Search getSearchTerm={getSearchTerm}/> */}
         </ul>
        <ul className="nav navbar-nav ml-auto w-100 justify-content-end">
           <li className="nav-item">
             <Link to='/profile' value="profile" onClick={goProfilePage} className='nav-link'>Profile</Link>
           </li>
           <li className="nav-item">
               <button data-target="#newCanvasModal" className='nav-link new-button' onClick={()=>dispatch(setCanvasTrue())}>Draw Doodle</button>
           </li>
           <li className="nav-item">
             <Link to='/' onClick={handleLogout} className='nav-link'>Log Out</Link>
           </li>
       </ul>
        </>
      }
    </div>
  </nav>
 )
}
  export default Nav;