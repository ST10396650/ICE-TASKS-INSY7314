import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [data, setData] = useState(null)

  useEffect(() => {
    fetch("http://localhost:5000/test") // backend endpoint
      .then((res) => res.json())
      .then((result) => {
        setData(result)
      })
      .catch((err) => console.error("Error fetching data:", err))
  }, [])


return (
    <>
        <h2>Welcome to PulseVote</h2>
    </>
)
}

export default App
