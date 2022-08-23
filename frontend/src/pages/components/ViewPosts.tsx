import React, {useState, useEffect} from 'react'
import { useGetAllPostsQuery } from '../../app/api/authAPI'

const ViewPosts = () => {
    const [allPosts, setAllPosts] = useState(null)
    const {data} = useGetAllPostsQuery()

    useEffect(() => {
        setAllPosts(data)
        console.log(allPosts)
    })
  return (
    <div>test</div>
  )
}

export default ViewPosts