import React from "react";
import {useNavigate} from 'react-router-dom'


function Login() {
  
  const navigate = useNavigate();

  const navigateToPage = () => {
    navigate("/Register");
    };
    return(
        <div>
          <div>test</div> 
          <button onClick={navigateToPage}>Click me to back</button> 
        </div>
    )
}

export default Login;