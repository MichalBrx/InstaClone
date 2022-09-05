import React, {useState} from 'react'
import {useParams} from "react-router-dom"
import { useNavigate } from "react-router";
import { useSignOutMutation } from "../../app/api/authAPI";

import OutsideClickHandler from 'react-outside-click-handler';

import { IconContext } from "react-icons";
import {FaRegPlusSquare, FaRegCompass, FaRegHeart} from 'react-icons/fa';
import { MdHomeFilled } from "react-icons/md";
import { BsChatDots, BsPersonCircle } from "react-icons/bs";

import LookFor from "./LookFor";
import Newpost from "./Newpost";

const Navbar = () => {

    const [isFocused, setIsFocused] = useState<boolean>(false)
    const [isCreate, setIsCreate] = useState <boolean>(false)
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const [logOut] = useSignOutMutation()

    const navigate = useNavigate();

    const handleLogOut = async () => {
        try {
          await logOut({}).unwrap()
          navigate("/Login");
        } catch (error) {
          console.log(error)
        }
      }

    const dropDown = (
        <div id="dropdown" className="relative -left-10rem -bottom-0.5rem w-14rem bg-white rounded divide-y divide-txt_grey shadow-lg z-10 " >
          <ul className="dropdown-menu border-whi_gray">
            <li>
              <a href="#" className="block py-1 px-4 hover:bg-whi_gray ">Profile</a>
            </li>
            <li>
              <a href="#" className="block py-1 px-4 hover:bg-whi_gray ">Saved</a>
            </li>
            <li>
              <a href="#" className="block py-1 px-4 hover:bg-whi_gray ">Settings</a>
            </li>
            <li>
              <a href="#" className="block py-1 px-4 hover:bg-whi_gray ">Switch accounts</a>
            </li>
          </ul>
          <a onClick={() => handleLogOut()} className="block py-1 px-4 hover:bg-whi_gray ">Log Out</a>
        </div>
      )


    var lookFor = (<LookFor/>)
    var newPost = (<Newpost/>)
  return (
    <div>
        <div className="flex h-16 border-b border-border_col justify-center bg-white mb-7 w-100%">  
          <div className="mx-4 flex justify-center items-center">
            <img className="w-104" src="insta.png" alt="Instagram"/>
          </div>
          <OutsideClickHandler
            onOutsideClick={() => {
              setIsFocused(false);
          }}>
            <div className="justify-center items-center ml-40 mt-4 w-350" id="tile2">
                <input  data-dropdown-toggle="lookFor" className={isFocused ? "hidden" :"h-9 w-260 rounded-lg border-none bg-browser py-1 pr-1 pl-4 focus:outline-0"} placeholder="Browse" onFocus={() => setIsFocused(!isFocused)} />
                {isFocused ? lookFor : null}
            </div>
          </OutsideClickHandler>
          <div className="mx-4 flex justify-center items-center  w-25rem" id="tile3">
            <IconContext.Provider value={{className: "h-7 mx-3 w-1.75rem"}}>
            <div className="h-7 mx-3 w-1.75rem cursor-pointer">
              <MdHomeFilled/>
            </div>
            <div id="chat" className="h-7 mx-3 w-1.75rem cursor-pointer">
              <BsChatDots/>
            </div>
            <OutsideClickHandler
              onOutsideClick={() => {
              setIsCreate(false);
            }}>
            <div id="create_post" className="h-7 mx-3 w-1.75rem cursor-pointer">
              <button onClick={() => setIsCreate(true)}><FaRegPlusSquare/></button>
              {isCreate ? newPost : null}
            </div></OutsideClickHandler>
            <div id="discover" className="h-7 mx-3 w-1.75rem cursor-pointer">
              <FaRegCompass/>
            </div>
            <div id="likes" className="h-7 mx-3 w-1.75rem cursor-pointer">
              <FaRegHeart/>
            </div>
            <OutsideClickHandler
              onOutsideClick={() => {
              setIsOpen(false);
            }}>
              <div id="profile" className="h-7 mx-3 w-1.75rem cursor-pointer">
                <button onClick={() => setIsOpen(!isOpen)} data-dropdown-toggle="dropdown" type="button">
                  <BsPersonCircle />
                </button>
                {isOpen ? dropDown : null}
              </div>
            </OutsideClickHandler>
            </IconContext.Provider>
          </div>
        </div>
    </div>
  )
}

export default Navbar