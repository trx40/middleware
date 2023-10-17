import { useState } from 'react'

function App() {
  const [logs, setLogs] = useState([])

  const handleFetch = async(e) =>{
    e.preventDefault();
    const response = await fetch("http://localhost:3000/logs");
    const newlogs = await response.json();
    console.log(logs)
    setLogs((prevlogs)=>
      [...prevlogs, ...newlogs]
    )
  }
  return (
    <>
    <div class="container-sm">
      <h1>Logs</h1>
    <ul class="list-group">
      { logs && (
        logs.map((log,index) => (
          <li key={index} class="list-group-item">{JSON.stringify(log)}</li>
        ))
      )
      }
    </ul>
    <button type="button" class="btn btn-info" onClick={handleFetch}>Fetch</button>

    </div>
    </>
  )
}

export default App
