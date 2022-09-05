import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router";
import {FaRegPlusSquare, FaRegCompass, FaRegHeart} from 'react-icons/fa';
import { IconContext } from "react-icons";
import { MdHomeFilled } from "react-icons/md";
import { BsChatDots, BsPersonCircle } from "react-icons/bs";
import { useGetCurrentUserQuery, useSignOutMutation } from "../app/api/authAPI";

import OutsideClickHandler from 'react-outside-click-handler';

import LookFor from "./components/LookFor";
import Suggestions from "./components/Suggestions";
import Newpost from "./components/Newpost";
import ViewPosts from "./components/ViewPosts";
import Navbar from "./components/Navbar";

// TODO || ASAP || przy propozycyjnych znajomych nie moze wyswietlac sie 
// TODO || profil zalogowanego uzytkownika

//  1. Zrobic wyszukiwarke ludzi
//  2. Zmienic zmienianie sie proponowanych znajomych po kliknieciu
//  3. Zapisywac Like'i
//  4. komentarze

function Scroll() {

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [isCreate, setIsCreate] = useState <boolean>(false)
  
  const {data, error, isLoading, isSuccess, isError} = useGetCurrentUserQuery()
  const [logOut] = useSignOutMutation()




  useEffect(() => {
    if(error === undefined){

    } else {
      navigate("/Login");
    }
  }, [error, data])


  const handleLogOut = async () => {
    try {
      await logOut({}).unwrap()
      navigate("/Login");
    } catch (error) {
      console.log(error)
    }
  }

const dropDown = (
  <div id="dropdown" className="relative w-14rem bg-white rounded divide-y divide-txt_grey shadow-lg z-10" >
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




    return(
      <div> 

        <Navbar />

        <div className="flex mb-40 justify-center">
          <div className="justify-center ml-56">

            <div className="bg-white border border-border_col w-29.25rem h-28 rounded-lg mb-4">
              Here should be followed pepole
            </div>

            <ViewPosts />

          </div>

          <div className="w-350  h-20 ml-8 ">

              <div className="flex justify-left w-350 items-center">
                <img className="rounded-full w-4rem m-2" src="https://cdn130.picsart.com/318381621277201.jpg" alt="image"></img>
                
                <div className="ml-3 mt-1">               
                  <p className="font-semibold text-sm">{data?.username}</p>  
                  <p className="text-txt_grey">{data?.name}</p>   
                </div>
                
              </div>

              <div>

                <p className="text-txt_grey text-sm font-semibold my-3"> Suggestions For You </p>
                <Suggestions/>

              </div>

             <p className="text-txt_grey text-xs mt-3"> © 2022 INSTAGRAM FROM MICHAL</p>

          </div>


        </div>

      </div>
    )
  }
  
  export default Scroll;