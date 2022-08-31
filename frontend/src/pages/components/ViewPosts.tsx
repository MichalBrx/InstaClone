import React, {useState, useEffect} from 'react'
import { useGetAllPostsQuery } from '../../app/api/authAPI'
import { HeartOutlined, CommentOutlined, ShareAltOutlined } from '@ant-design/icons'

const ViewPosts = () => {
    const [allPosts, setAllPosts] = useState(null)
    const {data} = useGetAllPostsQuery()

    useEffect(() => {
        setAllPosts(data)
    } )
  

  return (
    <div>
      {allPosts?.map((post: any, index: React.Key) => (
        <div key={index} className="bg-white border border-border_col w-29.25rem h-full rounded-lg my-10" id="container">
          <div className="flex ml-2" id="img and name">
            <div>
              <img className="rounded-full w-3rem m-2" src="https://cdn130.picsart.com/318381621277201.jpg" alt="image"></img>
            </div>
            <div className="flex items-center font-semibold">
              <div>{post.user_email}</div>
            </div>
          </div>

          <div id="photo" >
            <img src={`../../usersPosts/${post.file_name}`} alt='img'></img>
          </div>
          <div className='ml-2'>
            <div id='feedback' className="text-3xl">
              <HeartOutlined  className="m-2" /> 
              <CommentOutlined className="m-2" />
              <ShareAltOutlined className="m-2" />
            </div>
            <div className="m-2 flex gap-2 text-sm">
              <p className="font-semibold">{post.user_email}</p>
              <p>{post.caption}</p> 
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ViewPosts