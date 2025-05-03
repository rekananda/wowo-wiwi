import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { supabase } from './config/supabase/supabaseClient'

function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState<unknown[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('m_peran')
        .select('*')
      if (error) {
        console.error(error)
      } else {
        setData(data || [])
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div style={{marginTop: 32}}>
        <h2>Data dari Supabase</h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <pre>{JSON.stringify(data, null, 2)}</pre>
        )}
      </div>
    </>
  )
}

export default App
