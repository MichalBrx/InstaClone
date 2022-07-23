import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import "./index.css"

function Register() {


  const [isdisabled, setIsdiabled] = useState(true);

  const navigate = useNavigate();
  
  const {register,watch, handleSubmit,formState:{errors}} =useForm({
      defaultValues: {
        email: '',
        username:'',
        name:'',
        password:''
      } 
    })
    
  const navigateToPage = () => {
    navigate("/Login");
    };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(()=>{
  if(watch('email') !== "" && watch('name') !== "" && watch('username') !== "" && watch('password') !== ""){
    setIsdiabled(false)
  } else{
    setIsdiabled(true)
  }
  },)

  const responseFacebook = (response) => {
    console.log(response);
  }

  const sendingPostReq = data => {

    axios.post("http://127.0.0.1:8000/SignUp",data)
    .then(response =>{
      if(response.status === 200){
        navigateToPage()
      }
    })
    .catch(err => {
      console.log(err.response.status)
      if(err.response.status){
        alert("Wrong data")
      }
    })


  }



  return (
    <div>
      <div id="container">
        <div id="border">
          <div id="mainRegForm" className="mainReg_temp">
            <div id="header">
              <img id="insta_img" src="insta.png" alt="Instagram"></img>
            </div>

            <h2 id="underHeader">Sign Up to see photos and films  your friends.</h2>
            <div id="logByFb_div">
              <FacebookLogin
                appId="817559656065921"
                autoLoad={false}
                callback={responseFacebook} 
                render={renderProps => (
                  <button id="logByFb" onClick={renderProps.onClick}>Login by Facebook</button>
                )}/>
            </div>
            <div id="or">
              <div className="line" id="leftline"></div>
              <div id="textline"> OR</div>
              <div className="line" id="rightline"></div>
              </div>

            <form id="regForm" onSubmit={handleSubmit(data => sendingPostReq(data))}>
              <input 
                id="email_inp" 
                className="reg_input" 
                placeholder="Adress email"
                {...register('email', {required: {
                  value: true,
                  message: "Required"
                }})}
                ></input>
              <input 
                id="name_inp" 
                className="reg_input" 
                placeholder="Name & Surname"
                {...register('name', {required: {
                  value: true,
                  message: "Required"
                }})}
                ></input>
              <input 
                id="username_inp" 
                className="reg_input" 
                placeholder="Username"
                {...register('username', {required: {
                  value: true,
                  message: "Required"
                }})}
                ></input>
              <input 
                id="password_inp" 
                className="reg_input" 
                placeholder="Password"
                type='password'
                {...register('password', {
                  required: {
                    value: true,
                    message: "Required"}, 
                  minLength:{
                    value: 6,
                    message: "Your password is too short"
                  }}
                )}
                ></input>



            <div id="privacy_area">
              <p className="privacy_text"> These people from our service your services. Your Instagram contact information Find out more</p>
              <p className="privacy_text"> By registering, you accept the Regulations. Information about how we collect, we use rules that apply your data, our national data. About cookies related to files and technology, see the cookie policy.</p>
            </div>

            <div id="next_butt_div">
              <button id="next_butt" type="submit" form="regForm" onSubmit={handleSubmit} disabled={isdisabled}>Next step</button>
            </div>
          </form>
          </div>

          <div id="ifHave" className="mainReg_temp">
            <p id="alreadyHave">Have an account? <span id="navLogin" onClick={navigateToPage}>Log In</span></p>
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
  );
}

export default Register;
