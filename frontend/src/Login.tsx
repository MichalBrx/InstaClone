import React, {useEffect, useState, useContext, useRef} from "react";
import {useNavigate} from 'react-router-dom'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { useForm } from "react-hook-form";
import axios from "axios";



function Login() {

  
  const navigate = useNavigate();

  const [isdisabled, setIsdiabled] = useState(true);

  const errRef = useRef();

  const navigateToReg = () => {
    navigate("/Register");
    };
  const navigateToMain = () => {
    navigate("/Main");
    };

  const responseFacebook = (response: any) => {
    console.log(response);
  }

  const {register,watch, handleSubmit, formState: {errors}} =useForm({
    defaultValues: {
      email: '',
      password:''
    } 
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(()=>{
    if(watch('email') !== "" && watch('password') !== ""){
      setIsdiabled(false)
    } else{
      setIsdiabled(true)
    }
    },)

  const sendingPostReq = (data: { email: any; password: any; }) =>{
    console.log(data)
    let bodyFormData = new FormData();
    bodyFormData.append('username', data.email)
    bodyFormData.append('password', data.password)

    axios.post("http://127.0.0.1:8000/SignIn", bodyFormData)
    .then(response =>{
      if(response.status === 200){
        console.log(response)

        var email = watch('email')
        var pwd = watch('password')
        const accesToken = response?.data?.access_token
        navigateToMain()
      }
    })
    .catch(err=>{
      if(!err?.response) {
        console.log('No server response', errors);
      } else if (err.response.status === 400) {
        console.log('Missing email or password', errors);
      } else if (err.response.status ===401) {
        console.log('Unauthorized', errors);
      } else {
        console.log("Login Failed", errors);
      }
    //   errRef.current.focus()
    })
    }
  

    return(    
      <div className="bg-bg">
      <div className="flex justify-center">
        <div className="grid justify-center mt-24">
          <div className="bg-white w-[22rem] border border-border_col p-3 justify-center">
            <div className="flex justify-center mt-8">
              <img className="w-175" src="insta.png" alt="Instagram"></img>
            </div>

            <form className="grid justify-center mt-8" onSubmit={handleSubmit(data => sendingPostReq(data))}>
            <input 
                className="flex w-260 max-h-4 m-sm bg-fafa border border-border_col rounded font-light text-xs justify-self-center p-4 focus:outline-0 mb-2"
                placeholder="Adress email"
                {...register('email', {required:{
                  value: true,
                  message: "Required"
                }})}
                ></input>
            <input 
                className="flex w-260 max-h-4 m-sm bg-fafa border border-border_col rounded font-light text-xs justify-self-center p-4 focus:outline-0 mb-2"
                placeholder="Password"
                {...register('password', {required:{
                  value:true,
                  message: "Required"
                }})}
                ></input>

            <button type="submit" className="w-260 h-8 rounded bg-fb opacity-30 text-white border-none font-semibold transition mt-3 enabled:opacity-100 enabled:transition" disabled={isdisabled}>Log In</button>
            </form>
            <div className="flex justify-center text-txt_grey text-base font-medium mt-5">
              <div className="w-104 text-center border-b leading-3 my-3 mb-6" ></div>
              <div className="my-0 mx-4"> OR</div>
              <div className="w-104 text-center border-b leading-3 my-3 mb-6" ></div>
            </div>
            <div className="flex justify-center mb-4">

              <FacebookLogin
                  appId="817559656065921"
                  autoLoad={false}
                  callback={responseFacebook} 
                  render={renderProps => (
                    <button className="border-none p-1 text-dark_fb w-260 rounded font-semibold hover:cursor-pointer" onClick={renderProps.onClick}>Login by Facebook</button>
              )}/>
            </div>

          </div>

          <div id="ifHave" className="flex justify-center mt-3 px-3 py-5 text-sm border border-border_col">
            <p id="alreadyHave">Don't have an account? <span className="hover:cursor-pointer text-fb" onClick={navigateToReg}>Sign Up</span></p>
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
    )
}

export default Login;