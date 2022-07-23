import React from "react";
import {useNavigate} from 'react-router-dom'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import "./login.css"

function Login() {
  
  const navigate = useNavigate();

  const navigateToPage = () => {
    navigate("/Register");
    };
  const responseFacebook = (response) => {
    console.log(response);
  }
    return(
      <div>
      <div id="login_container">
        <div id="border">
          <div id="mainRegForm" className="mainReg_temp">
            <div id="header">
              <img id="insta_img" src="insta.png" alt="Instagram"></img>
            </div>

            <form id="logForm">
            <input 
                id="email_inp" 
                className="reg_input" 
                placeholder="Adress email"
                ></input>
            <input 
                id="password_inp" 
                className="reg_input" 
                placeholder="Password"
                ></input>

            <button type="submit" id="next_butt_log">Log In</button>
            </form>
            <div id="or_login">
              <div className="line" id="leftline"></div>
              <div id="textline"> OR</div>
              <div className="line" id="rightline"></div>
            </div>
            <div id="logByFb_div">
              <FacebookLogin
                  appId="817559656065921"
                  autoLoad={false}
                  callback={responseFacebook} 
                  render={renderProps => (
                    <button id="logByFb_log" onClick={renderProps.onClick}>Login by Facebook</button>
              )}/>
            </div>

          </div>

          <div id="ifHave" className="mainReg_temp">
            <p id="alreadyHave">Don't have an account? <span id="navLogin" onClick={navigateToPage}>Sign Up</span></p>
          </div>

          <div id="fromApp">

            <div id="download_text">
              <p>Download app.</p>
            </div>
            <div id="download_pics">
              <img className="app_pics" src="AppStore.png" alt="App Store"></img>
              <img className="app_pics" src="Googleplay.png" alt="Google play"></img>
            </div>

          </div>
        </div>
      </div>
      <footer >
        <div id="copyright">2022 InstaClone from Michał</div>
      </footer>
    </div>
    )
}

export default Login;