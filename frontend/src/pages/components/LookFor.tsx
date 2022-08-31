import React, {useEffect, useState, KeyboardEvent} from 'react'
import { useGetAllUsersQuery, useGetSearchMutation } from '../../app/api/authAPI'

const Search = () => {

  const {data} = useGetAllUsersQuery()
  const [searchUser] = useGetSearchMutation()

  const [searchValue, setSearchValue] = useState<string>("")
  const [searchResults, setSearchResults] = useState<Array<any>>([])
  
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



async function searchComponent(e: KeyboardEvent) {


  if(e.keyCode){
   
    try{
      const data = await searchUser(searchValue).unwrap()

      setSearchResults(data)

    } catch (error) {
      console.log(error)
    }
    
  }

}



function randomComponent() {

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
  <div>
    <div><input data-dropdown-toggle="searchList" className="h-9 w-260 rounded-lg border-none bg-browser py-1 pr-1 pl-4 focus:outline-0" placeholder="Browse" onChange={(e)=> setSearchValue(e.target.value)} onKeyUp={e => searchComponent(e)}/></div>
    <div id="searchList" className="relative z-10 w-350 bg-white divide-y divide-gray-100 shadow-lg mt-1 rounded-lg h-80">
      <div className="py-1 px-4 flex items-end justify-between">
        <p className="font-bold">Recent</p>
        <a className= "text-sm text-fb font-medium">clear all</a>
      </div>
      <ul className="py-1 text-sm border-none" aria-labelledby="dropdownDefault">

          { searchValue.length > 0 ? 
          <>
            {searchResults.map((user, idx) => 
              <li key={idx}>
                <a href="#" className="px-4 flex items-center">
                  <img className="rounded-full w-3rem mx-2 my-1" src='https://cdn130.picsart.com/318381621277201.jpg' alt='user_img'></img>
                  <div className="">
                    <p className="font-semibold text-base">{user.username}</p>
                    <p className="text-txt_grey">{user.name}</p>
                  </div>
                </a>
              </li>
            )}
          </> 
          : randomComponent()}


      </ul>
    </div>
  </div>
  )
}

export default Search