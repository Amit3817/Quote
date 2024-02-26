import { NavLink, useNavigate } from "react-router-dom";
import classes from "./MainHeader.module.css";
import AuthContext from "../../store/AuthContext";
import { useContext } from "react";
const MainHeader = () => {

 const authCtx=useContext(AuthContext);
 const isLoggedIn=authCtx.isLoggedIn;
 const navigate=useNavigate();

 const logOutHandler=()=>{

  authCtx.logOut();
  navigate("../quotes")
 }


  return (
    <header className={classes.header}>
      <nav>
        <h1>Great Quotes</h1>
        <ul>
         <li>
            <NavLink to="quotes">All Quotes</NavLink>
          </li>
        {isLoggedIn&&
          <li>
            <NavLink to="addquote">Add a Quote</NavLink>
          </li>
        
        }
        {!isLoggedIn&&
          <li>
            <NavLink to="auth">Sign In</NavLink>
          </li>
        }
        {
          isLoggedIn&&
          <li>
            <button onClick={logOutHandler} className={`btn ${classes.btnn}`}>Log Out</button>
          </li>

        }
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
