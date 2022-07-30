import axios from "axios";
import React from "react";
import {FaRegPlusSquare, FaRegCompass, FaRegHeart} from 'react-icons/fa';
import { IconContext } from "react-icons";
import { MdHomeFilled } from "react-icons/md";
import { BsChatDots } from "react-icons/bs";





function Scroll() {

    // const getting_current_user = () => {
    //   axios.get("http://127.0.0.1:8000/GetUser")
    //   .then( (response) => {
    //     console.log(response)
    //   })
    // }




    return(
      <div>

        <div className="flex h-16 border-b border-border_col justify-center bg-navBar mb-7 w-100%" >
          <div className="mx-4 flex justify-center items-center">
            <img className="w-104" src="insta.png" alt="Instagram"/>
          </div>
          <div className="mx-4 flex justify-center items-center ml-8" id="tile2">
            <input className="h-7 w-14rem rounded-lg border-none bg-browser py-1 pr-1 pl-4 focus:outline-0" placeholder="Browse"></input>
          </div>
          <div className="mx-4 flex justify-center items-center ml-12 w-25rem" id="tile3">
            <IconContext.Provider value={{className: "h-7 mx-3 w-1.75rem"}}>
            <div className="h-7 mx-3 w-1.75rem">
              <MdHomeFilled/>
            </div>
            <div id="chat" className="h-7 mx-3 w-1.75rem">
              <BsChatDots/>
            </div>
            <div id="create_post" className="h-7 mx-3 w-1.75rem">
              <FaRegPlusSquare/>
            </div>
            <div id="discover" className="h-7 mx-3 w-1.75rem">
              <FaRegCompass/>
            </div>
            <div id="likes" className="h-7 mx-3 w-1.75rem">
              <FaRegHeart/>
            </div>
            <div id="profile" className="h-7 mx-3 w-1.75rem">

            </div>
            </IconContext.Provider>
          </div>
        </div>

        <div className="flex mb-40 ml-96">
          <div className="justify-center">
            <div className="bg-navBar border border-border_col w-29.25rem h-28 rounded-lg mb-4">

            </div>
            <div className="bg-navBar border border-border_col w-29.25rem h-96">

            </div>
          </div>
          <div className="w-350 bg-navBar h-20 ml-8 ">
            <div className="flex border border-border_col h-20">

            </div>
            <div className="mt-4 border border-border_col h-60 bg-navBar">

            </div>
            <div className="flex justify-center mt-4 text-txt_grey text-xs">
             <p> © 2022 INSTAGRAM FROM META</p>
            </div>

          </div>

        </div>


      </div>
    )
  }
  
  export default Scroll;