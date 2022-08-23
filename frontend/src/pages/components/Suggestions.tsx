import React, {useEffect,useMemo,useRef} from 'react'
import { useGetAllUsersQuery } from '../../app/api/authAPI'

const Suggestions = () => {


const {data, isSuccess} = useGetAllUsersQuery()


var numbers: Array<any> = []
// setting random numbers into array called numbers, numbers can not repeat
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
    
        const arr = randomNum(0, data.length)

    return (
      <>
      {arr.map((num) => 
        <li key={num}>
            <a href="#" className="px-4 flex items-center">
                <img className="rounded-full w-3rem mx-2 my-1" src='https://cdn130.picsart.com/318381621277201.jpg' alt='user_img'></img>
                <div className="p-1 h-12">
                    <p className="font-semibold text-base">{data[num].username}</p>
                    <p className="text-txt_grey">{data[num].name}</p>
                </div>
            </a>
        </li>
        )}
      </>
    )
  }


  return (
    <>
    <ul className="py-1 text-sm border-none" aria-labelledby="dropdownDefault">


        {isSuccess ? Component() : null}

    </ul>
    </>
  )
}

export default Suggestions

