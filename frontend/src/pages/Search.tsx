import React, {useEffect} from 'react'
import { useGetAllUsersQuery } from '../app/api/authAPI'

const Search = () => {

  const {data, isSuccess, error,} = useGetAllUsersQuery()

  // setting random numbers into array called numbers, numbers can not repeat
  function randomNum(min: number, max: number) {
    var numbers: Array<number> = []
    for (let i = 0; i < 5; i++) {
      do {
        var random = Math.floor(Math.random() * (max - min )) + min;
        var include = numbers.includes(random)
        if(!include) {
            numbers.push(random)
        }
      }
      while(include)
    } return numbers
  } 
  


function Component() {
  let arr = randomNum(0, data.length)
  return (
    <>
      <li>
          <a href="#" className="py-2 px-4 flex items-center">
            <img className="rounded-full w-3rem m-2" src='https://cdn130.picsart.com/318381621277201.jpg' alt='user_img'></img>
            <div className="">
              <p className="font-semibold text-base">{data[arr[0]].username}</p>
              <p className="text-txt_grey">{data[arr[0]].name}</p>
            </div>
          </a>
      </li>
      <li>
        <a href="#" className="block py-2 px-4  ">{data[arr[1]].username}</a>
      </li>
      <li>
        <a href="#" className="block py-2 px-4  ">{data[arr[2]].username}</a>
      </li>
      <li>
        <a href="#" className="block py-2 px-4  ">{data[arr[3]].username}</a>
      </li>
      <li>
        <a href="#" className="block py-2 px-4  ">{data[arr[4]].username}</a>
      </li>
    </>
  )
}



  return(
    <div id="searchList" className="relative z-10 w-350 bg-white divide-y divide-gray-100 shadow-lg mt-1 rounded-lg h-80">
    <div className="py-1 px-4 flex items-end justify-between">
      <p className="font-bold">Recent</p>
      <a className= "text-sm text-fb font-medium">clear all</a>
    </div>
    <ul className="py-1 text-sm border-none" aria-labelledby="dropdownDefault">

        {isSuccess ? Component() : null}

    </ul>
</div>
  )
}

export default Search