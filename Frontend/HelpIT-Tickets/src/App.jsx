import './App.css'
import Get from './Components/Get.jsx'
import Post from './Components/Post.jsx'
import Navbar from './Components/Navbar.jsx'
import { useState } from 'react'

function App() {

  const [postHidden, setPostHidden] = useState(true)

  return (
    <>
      <Navbar postHidden={postHidden} setPostHidden={setPostHidden} />
      <Get />
      <Post hidden={postHidden} setPostHidden={setPostHidden} />
    </>
  )
}

export default App
