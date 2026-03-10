import { useState, useEffect } from "react"
import './App.css'

function App() {
  const [message, setMessage] = useState("")
  const [count, setCount] = useState(0)
  const [input, setInput] = useState("")
  const API_URL = import.meta.env.VITE_API_URL;

  // DynamoDBデータ取得
  useEffect(() => {
    fetch(`${API_URL}/hello`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.length > 0) {
          setMessage(data[data.length - 1].message)
        }
      })
      .catch(err => console.error(err))
  }, [])

  // DynamoDBへ保存
  const sendMessage = async () => {

    await fetch(`${API_URL}/hello`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: input
      })
    })

    setInput("")
  }

  return (
    <>
      <h1>API Test</h1>

      <p>Latest message: {message}</p>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="enter message"
      />

      <button onClick={sendMessage}>
        Send message
      </button>

      <br /><br />

      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
    </>
  )
}

export default App