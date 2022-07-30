import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import "./index.css"

function Register() {


  const [isdisabled, setIsdiabled] = useState(true);

  const navigate = useNavigate();
  
  const {register,watch, handleSubmit} =useForm({
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

  const responseFacebook = (response: any) => {
    console.log(response);
  }

  const sendingPostReq = (data: { email: string; username: string; name: string; password: string; }) => {

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
    <div className="bg-bg">
      <div className="flex justify-center">
        <div className="grid justify-center mt-14">
          <div className="bg-white w-[22rem] border border-border_col p-3 justify-center" >
            <div id="header" className="flex justify-center mt-8">
              <img className="w-175" src="insta.png" alt="Instagram"></img>
            </div>

            <h2 className="flex justify-center text-center my-5 mx-10 text-base text-txt_grey font-semibold font-helve" >Sign Up to see photos and films  your friends.</h2>
            <div className="flex justify-center mb-4">
              <FacebookLogin
                appId="817559656065921"
                autoLoad={false}
                callback={responseFacebook} 
                render={renderProps => (
                  <button className="bg-fb border-none p-1 text-white w-260 rounded font-medium hover:cursor-pointer" onClick={renderProps.onClick}>Login by Facebook</button>
                )}/>
            </div>
            <div className="flex justify-center text-txt_grey font-medium text-sm">
              <div className="w-104 text-center border-b leading-3 my-3 mb-6" ></div>
              <div className="my-0 mx-4"> OR</div>
              <div className="w-104 text-center border-b leading-3 my-3 mb-6"></div>
              </div>

            <form className="grid" onSubmit={handleSubmit(data => sendingPostReq(data))}>
              <input 
                className="flex w-260 max-h-4 m-sm bg-fafa border border-border_col rounded font-light text-xs justify-self-center p-4 focus:outline-0 mb-2"
                placeholder="Adress email"
                {...register('email', {required: {
                  value: true,
                  message: "Required"
                }})}
                ></input>
              <input 
                className="flex w-260 max-h-4 m-sm bg-fafa border border-border_col rounded font-light text-xs justify-self-center p-4 focus:outline-0 mb-2"
                placeholder="Name & Surname"
                {...register('name', {required: {
                  value: true,
                  message: "Required"
                }})}
                ></input>
              <input 
                className="flex w-260 max-h-4 m-sm bg-fafa border border-border_col rounded font-light text-xs justify-self-center p-4 focus:outline-0 mb-2"
                placeholder="Username"
                {...register('username', {required: {
                  value: true,
                  message: "Required"
                }})}
                ></input>
              <input 
                className="flex w-260 max-h-4 m-sm bg-fafa border border-border_col rounded font-light text-xs justify-self-center p-4 focus:outline-0 mb-2"
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



            <div className="mt-3 grid justify-center">
              <p className="flex text-center m-1 w-260 text-xs text-txt_grey"> These people from our service your services. Your Instagram contact information Find out more</p>
              <p className="flex text-center m-1 w-260 text-xs text-txt_grey"> By registering, you accept the Regulations. Information about how we collect, we use rules that apply your data, our national data. About cookies related to files and technology, see the cookie policy.</p>
            </div>

            <div className="flex justify-center mt-2 mb-8">
              <button className="w-260 h-7 rounded bg-fb opacity-30 text-white border-none font-semibold transition mt-3 enabled:opacity-100 enabled:transition " type="submit" form="regForm" onSubmit={handleSubmit(data => sendingPostReq(data))} disabled={isdisabled}>Next step</button>
            </div>
          </form>
          </div>

          <div className="flex justify-center mt-3 px-3 py-5 text-sm border border-border_col">
            <p id="alreadyHave">Have an account? <span className="hover:cursor-pointer text-fb" onClick={navigateToPage}>Log In</span></p>
          </div>

          <div className="mt-3">

            <div className="flex justify-center p-3">
              <p>Download app.</p>
            </div>
            <div className="flex justify-center">
              <img className="w-135 hover:cursor-pointer m-2" src="AppStore.png" alt="App Store"></img>
              <img className="w-135 hover:cursor-pointer m-2" src="Googleplay.png" alt="Google play"></img>
            </div>

          </div>
        </div>
      </div>
      <footer className="mt-16 flex justify-center">
        <div className="text-xs text-txt_grey">2022 InstaClone from Michał</div>
      </footer>
    </div>
  );
}

export default Register;
