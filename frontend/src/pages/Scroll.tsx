import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router";
import {FaRegPlusSquare, FaRegCompass, FaRegHeart} from 'react-icons/fa';
import { IconContext } from "react-icons";
import { MdHomeFilled } from "react-icons/md";
import { BsChatDots, BsPersonCircle } from "react-icons/bs";
import { useGetCurrentUserQuery } from "../app/api/authAPI";

import OutsideClickHandler from 'react-outside-click-handler';

import Search from "./components/Search";
import Suggestions from "./components/Suggestions";
import Newpost from "./components/Newpost";
import ViewPosts from "./components/ViewPosts";

// TODO || ASAP || przy propozycyjnych znajomych nie moze wyswietlac sie 
// TODO || profil zalogowanego uzytkownika

function Scroll() {

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [isCreate, setIsCreate] = useState <boolean>(false)
  const {data, error, isLoading, isSuccess, isError} = useGetCurrentUserQuery()

  const navigateToLog = () => {
    navigate("/Login");
    };


  useEffect(() => {
    if(error === undefined){

    } else {
      navigateToLog()
    }
  }, [error, data])






const dropDown = (
  <div id="dropdown" className="relative w-14rem bg-white rounded divide-y divide-txt_grey shadow-lg z-10">
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
    <a href="#" className="block py-1 px-4 hover:bg-whi_gray ">Log Out</a>
  </div>
)



  const [searchValue, setSearchValue] = useState<string>("")



  var searchList = (<Search/>)
  var suggestions = (<Suggestions/>)
  var newPost = (<Newpost />)
  var viewPosts = (<ViewPosts />)

    return(
      <div>
        <div className="flex h-16 border-b border-border_col justify-center bg-navBar mb-7 w-100%">  
          <div className="mx-4 flex justify-center items-center">
            <img className="w-104" src="insta.png" alt="Instagram"/>
          </div>
          <OutsideClickHandler
            onOutsideClick={() => {
              setIsFocused(false);
          }}>
            <div className="justify-center items-center ml-40 mt-4 w-350" id="tile2">
                <input data-dropdown-toggle="searchList" className="h-9 w-260 rounded-lg border-none bg-browser py-1 pr-1 pl-4 focus:outline-0" placeholder="Browse" onFocus={() => setIsFocused(!isFocused)} onChange={(e)=> setSearchValue(e.target.value)}/>
                {isFocused ? searchList : null}
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

        <div className="flex mb-40 justify-center">
          <div className="justify-center ml-56">
            <div className="bg-navBar border border-border_col w-29.25rem h-28 rounded-lg mb-4">

            </div>
            <div className="bg-navBar border border-border_col w-29.25rem h-96">
                {viewPosts}
            </div>
          </div>

          <div className="w-350  h-20 ml-8 ">

              <div className="flex justify-left w-350 items-center">
                <img className="rounded-full w-4rem m-2" src="https://cdn130.picsart.com/318381621277201.jpg" alt="image"></img>
                
                <div className="ml-3 mt-1">               
                  <p className="font-semibold text-sm">{data?.username}</p>  
                  <p className="text-txt_grey">{data?.name}</p>   
                </div>
                
              </div>
              <p className="text-txt_grey text-sm font-semibold my-3">
                Suggestions For You
              </p>

              <div id="other_users" className="">
                {suggestions}
              </div> 
            

             <p className="text-txt_grey text-xs mt-3"> © 2022 INSTAGRAM FROM MICHAL</p>


          </div>


        </div>

      </div>
    )
  }
  
  export default Scroll;