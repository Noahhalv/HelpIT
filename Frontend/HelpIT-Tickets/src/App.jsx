import './App.css'
import Get from './Components/Get.jsx'
import Post from './Components/Post.jsx'
import Navbar from './Components/Navbar.jsx'
import { useEffect, useState } from 'react'

function App() {

  const [postHidden, setPostHidden] = useState(true)

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3002/api/v1.0.0/tickets");
      const data = await response.json();
      console.log(data.data);
      setItems(data.data);
    } catch (err) {
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbar postHidden={postHidden} setPostHidden={setPostHidden} />
      <Get items={items} loading={loading} error={error} refetch={fetchData}/>
      <Post hidden={postHidden} setPostHidden={setPostHidden} onSuccess={fetchData} />
    </>
  )
}

export default App
