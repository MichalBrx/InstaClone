import React, {useState, useEffect} from 'react'
import { useUploadFileMutation } from '../../app/api/authAPI'
import { useNavigate } from 'react-router'

const Newpost = () => {

  const [selectedFile, setSelectedFile] = useState(null)
  const [caption, setCaption] = useState("")
  const [state, setState] = useState(true)

  const navigate = useNavigate()
  
  const [
    uploadFile, {
      data: data, 
      isSuccess: isLoginSuccess,
      isError: isLoginError, 
      error: loginError
    }] = useUploadFileMutation();

     
  const handleSubmit = () => {
    const formData = new FormData()
    formData.append(
      "file",
      selectedFile,
      selectedFile.name
    )
    uploadFile(formData)
    console.log(data)
  }

  useEffect(() => {
    selectedFile ? setState(true) : setState(false) 
  }, [selectedFile])

  return (
    <>
    <div>
      <div className="w-47rem z-20 bg-white relative -left-40rem -bottom-2rem rounded-2xl shadow-max ">
          <div className='flex justify-center p-2'>
              <p className="font-semibold">Create new post</p>
          </div>
          <hr className="border-border_col"/>
          <div className="p-40 pt-60 pb-80 grid justify-center gap-4">
            {state ? null : 
              <>
                <div className='flex justify-center '>
                  <img src='..\..\NewpostIMG.jpg' alt='IMG' />
                </div>
                <div className="flex justify-center">
                  <h2 className="text-xl">Drag photos and videos here</h2>
                </div> 
              </>
            }
              
              <div>
                <form className="grid justify-center gap-2">

                  { state ? 
                    <>
                      <div className="flex justify-center mb-5 w-100% ">
                        <input onChange={ (e) => setCaption(e.target.value)} type="text" placeholder='Enter your caption' className='flex justify-left pl-4 h-8 rounded w-100% border-fb border-2 -mt-16 focus:outline-fb_light'></input>
                      </div>
                    </>
                  : null}

                  <fieldset>
                    <img src={ selectedFile ? URL.createObjectURL(selectedFile) : null} className="w-photo max-h-max" />
                  </fieldset>
                  <fieldset >
                    <input onChange={ (e:any) => setSelectedFile(e.target.files[0]) } name='image' type="file" accept=".jpeg, .png, .jpg" className="file:border-none file:bg-fb file:active:bg-fb_light file:text-white file:font-semibold file:mr-20 file:px-6 hover:file:cursor-pointer text-txt_grey rounded border-2 border-fb pr-3 w-100% "></input>
                  </fieldset>

                  <button onClick={handleSubmit} className="bg-fb text-white font-semibold rounded p-1 active:bg-fb_light">Select!</button> 

                </form>
              </div>
          </div>
      </div>
    </div>
    </>
  )
}

export default Newpost