import React from 'react'

const Newpost = () => {
  return (
    <>
    {/* tu skonczulem zrobic ciemniejszy ekran wokol componentu */}
    <div >
      <div className="w-47rem z-20 bg-white relative -left-40rem -bottom-2rem rounded-2xl shadow-max">
          <div className='flex justify-center p-2'>
              <p className="font-semibold">Create new post</p>
          </div>
          <hr className="border-border_col"/>
          <div className="p-40 pt-60 pb-80 grid justify-center gap-4">
              <div className='flex justify-center'><img src='..\..\NewpostIMG.jpg' alt='IMG' /></div>
              <div className="flex justify-center"><h2 className="text-xl">Drag photos and videos here</h2></div>
              <div className="flex justify-center">
                <button className="bg-fb text-white font-semibold rounded p-1 active:bg-fb_light">Select from computer</button> 
              </div>
          </div>
      </div>
    </div>
    </>
  )
}

export default Newpost