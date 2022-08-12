import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router";
import {FaRegPlusSquare, FaRegCompass, FaRegHeart} from 'react-icons/fa';
import { IconContext } from "react-icons";
import { MdHomeFilled } from "react-icons/md";
import { BsChatDots, BsPersonCircle } from "react-icons/bs";
import { useGetCurrentUserQuery, useGetAllUsersQuery } from "../app/api/authAPI";

import OutsideClickHandler from 'react-outside-click-handler';




function Scroll() {

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isFocused, setIsFocused] = useState<boolean>(false)
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

const searchList = (
  <div id="searchList" className="relative z-10 w-350 bg-white divide-y divide-gray-100 shadow-lg mt-1 rounded-lg h-80">
    <div className="py-1 px-4 flex items-end justify-between">
      <p className="font-bold">Recent</p>
      <a className= "text-sm text-fb font-medium">clear all</a>
    </div>
    <ul className="py-1 text-sm border-none" aria-labelledby="dropdownDefault">
      <li>
        <a href="#" className="block py-2 px-4 ">Dashboard</a>
      </li>
      <li>
        <a href="#" className="block py-2 px-4 ">Settings</a>
      </li>
      <li>
        <a href="#" className="block py-2 px-4  ">Earnings</a>
      </li>
      <li>
        <a href="#" className="block py-2 px-4  ">Sign out</a>
      </li>
    </ul>
</div>
)

  const [searchValue, setSearchValue] = useState<string>("")
  const [num, setNum] = useState()


function randomNumber(min:number, max:number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}





  const allUsers =  async () => {
    const {data, error} = useGetAllUsersQuery()
    var randomUsers: Array<object> = []
    useEffect(() => {
      console.log(data)
      for( let i = 0; i<5; i++) {
        randomUsers.push(data[i])
      }
  console.log(randomUsers)
    },[])
  } 
  allUsers()






    return(
      <div>

        <div className="flex h-16 border-b border-border_col justify-center bg-navBar mb-7 w-100% " >
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
            <div id="create_post" className="h-7 mx-3 w-1.75rem cursor-pointer">
              <FaRegPlusSquare/>
            </div>
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

            </div>
          </div>

          <div className="w-350  h-20 ml-8 ">

              <div className="flex justify-left w-350">
              <IconContext.Provider value={{className: "h-14 w-4rem"}}><BsPersonCircle /></IconContext.Provider>
              
              <div className="grid ml-3 mt-1">               
               <p>{data?.username}</p>  
               <p>{data?.name}</p>   
              </div>
              
              </div>
              <p className="text-txt_grey text-sm font-semibold my-3">
                Suggestions For You
              </p>

              <div id="other_users" className="">
                <div className="p-1 h-12">user1</div>
                <div className="p-1 h-12">user2</div>
                <div className="p-1 h-12">user3</div>
                <div className="p-1 h-12">user4</div>
                <div className="p-1 h-12">user5</div>
              </div> 
            

             <p className="text-txt_grey text-xs"> © 2022 INSTAGRAM FROM MICHAL</p>


          </div>


        </div>

      </div>
    )
  }
  
  export default Scroll;