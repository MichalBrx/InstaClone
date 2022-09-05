import React, {useState} from 'react'
import Navbar from './components/Navbar'

const Profile = () => {

    const [follow, setFollow] = useState<boolean>()
    const [profileData, setProfileData] = useState({})
 
  return (
    <div>
        <Navbar/>

    </div>
  )
}

export default Profile