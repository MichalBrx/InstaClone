import React, {useEffect} from 'react'
import { useGetAllUsersQuery } from '../../app/api/authAPI'

const Search = () => {

  const {data, isSuccess, error,} = useGetAllUsersQuery()

  // setting random numbers into array called numbers, numbers can not repeat
  var numbers: Array<number> = []
  function randomNum(min: number, max: number) {
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
    {arr.map((num) => 
      <li key={num}>
          <a href="#" className="px-4 flex items-center">
            <img className="rounded-full w-3rem mx-2 my-1" src='https://cdn130.picsart.com/318381621277201.jpg' alt='user_img'></img>
            <div className="">
              <p className="font-semibold text-base">{data[num].username}</p>
              <p className="text-txt_grey">{data[num].name}</p>
            </div>
          </a>
      </li>)}
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